import React, { Component } from 'react'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton'; 
import Intervention from './Intervention';

export class NegativeResponse extends Component {
    behaviors = [
        "Tantrum", 
        "Disruption behavior",
        "Repetitive stereotyped behaviors",
        "Climbing",
        "Inappropriate play",
        "Property destruction", 
        "Physical aggression",
        "Verbal aggression",
        "Off task non-disruptive behavior",
        "Stereotypy behavior",
        "Onychophagia",
        "Self-injurious behavior", 
        "Task refusal",
        "Onychophagy",
        "Inappropriate social interactions",
        "Excessive motor activities"
    ];
    
    render() {
        const { 
            response, 
            behaviorChanged
        } = this.props;
        return (
            <React.Fragment>
                <div class="form-group">
                    <label>Behavior</label>
                    <br/>
                    <div class="styled-select clearfix">
                        <DropDownMenu 
                                value={response.behavior}
                                onChange={behaviorChanged}>
                            {this.behaviors.map(behavior => 
                                <MenuItem value={behavior}
                                        primaryText={behavior} />    
                                )}
                        </DropDownMenu>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default NegativeResponse
