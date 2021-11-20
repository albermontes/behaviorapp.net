import React, { Component } from 'react'
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export class PositiveResponse extends Component {
    reinforcements = [
        "Praises",
        "Edibles items",
        "A give me five",
        "Time to play a video game",
        "Time to play outside in the yard",
        "Time to play in the common areas of the condo",
        "Time to play a favorite board game or toy",
    ];
    replacements = [
        "Accepting delay of attention",
        "Escape training",
        "Appropriate attention seeking",
        "Appropriate asking for tangible",
        "Accepting no response",
        "Tact training",
        "Turn-Taking skills", 
        "Social skills training",
        "Task completion"
    ];
    render() {
        const { 
            response, 
            positiveResponseDescriptionChanged,
            reinforceBeforeChanged,
            replacementChanged,
            reinforceAfterChanged
        } = this.props;
        return (
            <React.Fragment>
                <div class="form-group">
                    <label>Response description</label>
                    <br/>
                    <div class="styled-select clearfix">
                        <TextField 
                            placeholder="Description"
                            value={response.positive}
                            onChange={positiveResponseDescriptionChanged}>
                        </TextField>
                    </div>
                </div>
                <div class="form-group">
                    <label>Reinforce before Replacement</label>
                    <br/>
                    <div class="styled-select clearfix">
                        <DropDownMenu 
                                value={response.reinforceBefore}
                                onChange={reinforceBeforeChanged}>
                            {this.reinforcements.map(reinforce => 
                                <MenuItem value={reinforce}
                                        primaryText={reinforce} />    
                                )}
                        </DropDownMenu>
                    </div>
                </div>
                <div class="form-group">
                    <label>Replacement</label>
                    <br/>
                    <div class="styled-select clearfix">
                        <DropDownMenu 
                                value={response.replacement}
                                onChange={replacementChanged}>
                            {this.replacements.map(replacement => 
                                <MenuItem value={replacement}
                                        primaryText={replacement} />    
                                )}
                        </DropDownMenu>
                    </div>
                </div>
                <div class="form-group">
                    <label>Reinforce after Replacement</label>
                    <br/>
                    <div class="styled-select clearfix">
                        <DropDownMenu 
                                value={response.reinforceAfter}
                                onChange={reinforceAfterChanged}>
                            {this.reinforcements.map(reinforce => 
                                <MenuItem value={reinforce}
                                        primaryText={reinforce} />    
                                )}
                        </DropDownMenu>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default PositiveResponse
