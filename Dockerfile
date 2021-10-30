#ARG REPO=mcr.microsoft.com/dotnet/core
#FROM $REPO/aspnet:3.1-buster-slim AS base
ARG REPO=mcr.microsoft.com/dotnet/core
FROM $REPO/aspnet:5.0.11-bullseye-slim-amd64 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM $REPO/sdk:5.0.11-bullseye-slim-amd64 AS build
ENV BuildingDocker true
WORKDIR /src
COPY ["behavior-app.csproj", ""]
RUN dotnet restore "behavior-app.csproj"
COPY . .
WORKDIR "/src"
RUN dotnet build "behavior-app.csproj" -c Release -o /app/build

FROM alpine:3.12 as build-node
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