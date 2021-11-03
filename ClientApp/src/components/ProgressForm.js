import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'; 
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

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
    ]
    render(){
        const { values, handleDropDownChange } = this.props;
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