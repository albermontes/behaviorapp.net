import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'; 
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

export class IntroductionForm extends Component {
    nextStep = e => {
        e.preventDefault();
        this.props.nextStep();
    }
    render() {
        const { values, handleChange } = this.props;
        return (
            <MuiThemeProvider>
                <React.Fragment>
                    <AppBar title="Introduction" />
                    <h4>Location</h4>
                    <TextField
                        hintText="Enter a location"
                        onChange={handleChange('location')}
                        defaultValue={values.location}
                    />
                    <h4>Caregivers</h4>
                    <TextField
                        hintText="Enter the caregivers"
                        onChange={handleChange('caregivers')}
                        defaultValue={values.caregivers}
                    />
                    <br/>
                    <RaisedButton
                        label="Next"
                        primary={true}
                        styles={styles.button}
                        onClick={this.nextStep}
                    />
                </React.Fragment>
            </MuiThemeProvider>
        )
    }
}

const styles = {
    button: {
        margin: 15
    }
}

export default IntroductionForm
