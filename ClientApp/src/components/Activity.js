import React, { Component } from 'react'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import RaisedButton from 'material-ui/RaisedButton'; 
import '../css/site.css';
import deleteIcon from '../img/ba-icon-delete.svg';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PositiveResponse from './PositiveResponse';
import NegativeResponse from './NegativeResponse';

export class Activity extends Component {

    render() {
        const { 
            activityNumber,
            activity, 
            activities, 
            interventions,
            activityChanged,
            activityResponseChanged,
            removeActivity,
            behaviorChanged,
            positiveResponseDescriptionChanged,
            reinforceBeforeChanged,
            replacementChanged,
            reinforceAfterChanged,
            interventionChanged
        } = this.props;
        var activityResponse = '';
        switch(activity.response.type){
            case 'negative':
                activityResponse = (
                    <NegativeResponse 
                        response={activity.response}
                        behaviorChanged={behaviorChanged}
                        interventionChanged={interventionChanged}
                    />
                )
                break;
            case 'positive':
                activityResponse = (
                    <PositiveResponse
                        response={activity.response}
                        positiveResponseDescriptionChanged={positiveResponseDescriptionChanged}
                        reinforceBeforeChanged={reinforceBeforeChanged}
                        replacementChanged={replacementChanged}
                        reinforceAfterChanged={reinforceAfterChanged}
                    />
                )
                break;
            default:
                break;
        }
        return (
            <div class="shadow p-3 mb-3 gnx-bck-darkgray">
                <div class="d-flex justify-content-between">
                    <div>
                        <h5>
                            {activityNumber} {activity.description 
                                ? activity.type.toUpperCase() +
                                    ': ' +
                                    activity.description
                                : activity.type.toUpperCase()}
                        </h5>
                        <div class="pl-4">
                            {activity.response.type.toUpperCase()}
                        </div>
                    </div>
                    <div class="pt-2">
                        <button class="pt-2 ba-button ba-button ba-button-action"
                                onClick={removeActivity}>
                            <img src={deleteIcon} alt="" width="13"/>
                        </button>
                    </div>
                </div>
                <React.Fragment>
                    <DropDownMenu 
                        value={activity.description}
                        onChange={activityChanged}>
                            {activity.type == 'activity'
                                ? activities.map(x => 
                                    <MenuItem value={x}
                                        primaryText={x} 
                                    />)    
                                : interventions.map(x => 
                                    <MenuItem value={x}
                                        primaryText={x} 
                                    />)   
                            }
                    </DropDownMenu>
                    <br/>
                    <FormControl component="fieldset">
                        <RadioGroup row
                                value={activity.response.type}
                                onChange={activityResponseChanged}> 
                            <FormControlLabel value="positive"
                                disabled={activity.description === ''}
                                control={<Radio />} label="POSITIVE" />
                            <FormControlLabel value="negative" 
                                disabled={activity.description === ''}
                                control={<Radio />} label="NEGATIVE" />
                        </RadioGroup>
                    </FormControl>
                    {activityResponse}            
                </React.Fragment>
            </div>
        )
    }
}

export default Activity
