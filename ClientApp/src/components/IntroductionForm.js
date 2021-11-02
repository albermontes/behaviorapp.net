import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'; 

export class IntroductionForm extends Component {
    continue = e => {
        console.log('clicked');
        e.preventDefault();
        this.props.nextStep();
    }
    render() {
        const { values, handleChange } = this.props;
        return (
            <MuiThemeProvider>
                <React.Fragment>
                    <AppBar title="Introduction" />
                    <TextField
                        hintText="Enter a location"
                        floatingLabelText="Location"
                        onChange={handleChange('location')}
                        defaultValue={values.location}
                    />
                    <br/>
                    <TextField
                        hintText="Enter the caregivers"
                        floatingLabelText="Caregivers"
                        onChange={handleChange('caregivers')}
                        defaultValue={values.caregivers}
                    />
                    <br/>
                    <RaisedButton
                        label="Next"
                        primary={true}
                        styles={styles.button}
                        onClick={this.continue}
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
