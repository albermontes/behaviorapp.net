#ARG REPO=mcr.microsoft.com/dotnet/core
ARG REPO=mcr.microsoft.com/dotnet
#FROM $REPO/aspnet:3.1-buster-slim AS base
FROM $REPO/aspnet:5.0.11-bullseye-slim-amd64 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

#FROM $REPO/sdk:3.1-buster AS build
FROM $REPO/sdk:6.0 AS build
ENV BuildingDocker true
WORKDIR /src
COPY ["behavior-app.csproj", ""]
RUN dotnet restore "behavior-app.csproj"
COPY . .
WORKDIR "/src"
RUN dotnet build "behavior-app.csproj" -c Release -o /app/build

#FROM node:12-alpine as build-node
FROM node:16 as build-node
WORKDIR ClientApp
COPY ClientApp/package.json .
COPY ClientApp/package-lock.json .
RUN npm install
COPY ClientApp/ .
RUN npm run-script build

FROM build AS publish
RUN dotnet publish "behavior-app.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
COPY --from=build-node /ClientApp/build ./ClientApp/build
CMD ASPNETCORE_URLS=http://*:$PORT dotnet behavior-app.dll