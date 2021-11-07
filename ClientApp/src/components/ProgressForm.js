import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'; 
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import ActivityResponse from './ActivityResponse';
export class ProgressForm extends Component {
    nextStep = e => {
        e.preventDefault();
        this.props.nextStep();
    }
    prevStep = e => {
        e.preventDefault();
        this.props.prevStep();
    }
    activities = [
        "Playing simples and structured didactic activities",
        "Doing some exercises for the focus of attention on the RBT’s" ,
        "Making some designs using the Legos’ set",
        "Playing and making figures and forms with play dough",
        "Playing with puzzles",
        "Playing with mazes",
        "Playing matching activities (Word-pictures-numbers)",
        "Coloring and drawing",
        "Playing some boards game",
        "Playing video games"
    ];
    
    render(){
        const { values, handleDropDownChange, handleChange } = this.props;
        return (
            <MuiThemeProvider>
                <React.Fragment>
                    <AppBar title="Progress" />
                    <h4>Activity</h4>
                    <DropDownMenu 
                            floatingLabelText="Activity"
                            value={values.activities} 
                            onChange={handleDropDownChange('activities')}>
                        {this.activities.map(activity => 
                            <MenuItem value={activity}
                                    primaryText={activity} />    
                            )}
                    </DropDownMenu>
                    <br/>
                    <FormControl component="fieldset">
                        <RadioGroup row
                                value={values.activityResponse} 
                                onChange={handleChange('activityResponse')}> 
                            <FormControlLabel value="positive"
                                disabled={values.activities === ''} 
                                control={<Radio />} label="POSITIVE" />
                            <FormControlLabel value="negative" 
                                disabled={values.activities === ''}
                                control={<Radio />} label="NEGATIVE" />
                        </RadioGroup>
                    </FormControl>
                    <br/>
                    <ActivityResponse
                        handleChange={handleChange}
                        handleDropDownChange={handleDropDownChange}
                        values={values}
                    />
                    <br/>
                    <RaisedButton
                        label="Previous"
                        primary={true}
                        styles={styles.button}
                        onClick={this.prevStep}
                    />
                </React.Fragment>
            </MuiThemeProvider>
        );
    }
}

const styles = {
    button: {
        margin: 15
    }
}

export default ProgressForm;