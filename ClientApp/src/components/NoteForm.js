import React, { Component } from 'react'
import IntroductionForm from './IntroductionForm';
import ProgressForm from './ProgressForm';
import NoteSummary from './NoteSummary';

export class NoteForm extends Component {
    
    state = {
        step: 1,
        location: '',
        caregivers: '',
        activities: '',
        activityResponse: '',
        positiveResponse: '',
        reinforcementsBefore: '',
        reinforcementsAfter: '',
        replacements: '',
        interventions: '',
        behaviors: ''
    };

    // proceed to next step
    nextStep = () => {
        const { step } = this.state;
        this.setState({ 
            step: step + 1
        });
    };
    // go back to previous step
    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        });
    };
    // handle fields change
    handleChange = input => (event, value) => {
        this.setState({
            [input]: value
        });
        if(input === 'activityResponse'){
            switch(value){
                case 'positive':
                    this.setState({
                        behaviors: '',
                        interventions: ''
                    });
                    break;
                case 'negative':
                    this.setState({
                        positiveResponse: '',
                        reinforcementsBefore: '',
                        reinforcementsAfter: '',
                        replacements: ''
                    });
                    break;
                default:
                    break;
            }
        }
    };
    handleDropDownChange = input => (event, index, value) => {
        this.setState({
            [input]: value
        });
    }
   
    render() {
        let currentStep;
        switch(this.state.step){
            case 1:
                currentStep = (
                    <IntroductionForm
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        values={this.state}
                    />
                )
                break;
            case 2:
                currentStep = (
                    <ProgressForm
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        handleDropDownChange={this.handleDropDownChange}
                        values={this.state}
                    />
                )
                break;
            case 3:
                currentStep = <h1>ConclusionForm</h1>
                break;
            case 4:
                currentStep = <h1>Success</h1>
                break;
            default:
                console.log('multi-step built with react');
                break;
        }
        
        return (
            <React.Fragment>
                <td width={styles.column.width} 
                        align={styles.column.align}>
                    <NoteSummary 
                        values={this.state}/>
                </td>
                <td width={styles.splitWidth}></td>
                <td width={styles.column.width} 
                        align={styles.column.align}>
                    {currentStep}
                </td>
            </React.Fragment>
        );
    }
}

const styles = {
    column: {
        width: '200px',
        align: 'center'
    },
    splitWidth: '20%'
} 

export default NoteForm;
