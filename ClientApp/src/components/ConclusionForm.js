import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'; 
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

export class ConclusionForm extends Component {
    nextStep = e => {
        e.preventDefault();
        this.props.nextStep();
    }
    prevStep = e => {
        e.preventDefault();
        this.props.prevStep();
    }
    render() {
        const { values, handleChange } = this.props;
        return (
            <MuiThemeProvider>
                <React.Fragment>
                    <AppBar title="Conclusion" />
                    <TextField
                        hintText="Enter a health summary"
                        onChange={handleChange('health')}
                        defaultValue={values.health}
                    />
                    <br/>
                    <TextField
                        hintText="Enter family feedback"
                        onChange={handleChange('family')}
                        defaultValue={values.family}
                    />
                    <br/>
                    <TextField
                        hintText="Enter caregiver competency"
                        onChange={handleChange('competency')}
                        defaultValue={values.competency}
                    />
                    <br/>
                    <br/>
                    <RaisedButton
                        label="Previous"
                        primary={true}
                        onClick={this.prevStep}
                    />
                </React.Fragment>
            </MuiThemeProvider>
        )
    }
}

export default ConclusionForm
