import React, { Component } from 'react'
import logo from '../img/logo.png';

export class MyClients extends Component {
  render() {
    return (
        <div className="container-fluid full-height">
            <div className="gnx-bck-dark">
                <div>
                    <div className="d-flex justify-content-between p-3">
                        <div>
                            <a id="logo" href="/">
                                <img src={logo} alt="" width="49" height="35"/>
                            </a>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between gnx-bck-lightgray ba-add-client py-2">
                        <h3>ADD CLIENT</h3>
                        <div>
                            <input type="text" name="clientName" class="form-control required"
                                placeholder="Insert client name"/>
                        </div>
                        <div>
                            <input class="form-control required" type="date" name="dateOfBirth"
                                placeholder="Select DOB"/>
                        </div>
                        <div class="d-flex radio_input">
                            <label class="container_radio">
                                Verbal
                                <input type="radio" name="gender" value="Verbal" class="required"/>
                                <span class="checkmark"></span>
                            </label>
                            <label class="container_radio">
                                No verbal
                                <input type="radio" name="gender" value="No verbal" class="required"/>
                                <span class="checkmark"></span>
                            </label>
                        </div>

                        <div>
                            <input type="text" name="additionalComments" class="form-control"
                                placeholder="Comments" />
                        </div>

                        <div class="pr-3">
                            <button class="ba-button ba-button-sm" type="submit">
                                ADD
                            </button>
                        </div>
                    </div>

                    <div class="ba-client-table table-responsive">
                        <table class="table table-dark table-sm table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">NAME</th>
                                    <th scope="col">AGE</th>
                                    <th scope="col">VERBAL</th>
                                    <th scope="col">COMMENTS</th>
                                </tr>
                            </thead>
                            <tbody>
                            {/*  @foreach (var client in Model)
                                {
                                    var verbal = client.Verbal ? "YES" : "NO";
                                <tr>
                                    <th scope="row">@client.Number.ToString("000#")</th>
                                    <td>
                                        <a class="text-capitalize"
                                        asp-controller="Notes"
                                        asp-action="Index"
                                        asp-route-id="@client.Id">
                                            @client.Name
                                        </a>
                                    </td>
                                    <td>@client.DateOfBirth.ToShortDateString()</td>
                                    <td>@verbal</td>
                                    <td>@client.Comments</td>
                                    <td class="text-right">
                                        <button class="ba-button ba-button-sm ba-button-action-2"
                                                asp-controller="Profiles"
                                                asp-action="Index"
                                                asp-route-id="@client.Id">
                                            EDIT
                                        </button>
                                        <button class="ba-button ba-button-sm ba-button-action"
                                                asp-controller="Clients"
                                                asp-action="Delete"
                                                asp-route-id="@client.Id">
                                            <img src="img/ba-icon-delete.svg" alt="" width="13" />
                                        </button>
                                    </td>
                                </tr>
                                } */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}

export default MyClients