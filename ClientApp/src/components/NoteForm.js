import React, { Component } from 'react'
import IntroductionForm from './IntroductionForm';
import ProgressForm from './ProgressForm';
import NoteSummary from './NoteSummary';
import ConclusionForm from './ConclusionForm';

export class NoteForm extends Component {
    
    state = {
        step: 1,
        location: '',
        caregivers: '',
        health: '',
        family: '',
        competency: '',
        activities: [{type: 'activity', description: '', response: {type:''}}]
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
    handleChange = (property) => (event, value) => {
        this.setState({
            [property]: value
        });
    }
    handleSelectedActivityChanged = (i) => (event, index, value) => {
        let activities = [...this.state.activities];
        activities[i] = {
            type: activities.at(i).type,
            description: value,
            response: {
                type: ''
            }
        }
        this.setState({
            activities: activities
        });
    }
    handleSelectedActivityResponseChanged = (i) => (event, value) => {
        let activities = [...this.state.activities];
        activities.at(i).response = { type: value };
        this.setState({
            activities: activities
        });
    }
    handleNewActivity = () => {
        this.setState(prevState => ({
            activities: [
                ...prevState.activities,
                { type: 'activity', description: '', response : { type: '' } }
            ]
        }));
    }
    handleNewIntervention = () => {
        this.setState(prevState => ({
            activities: [
                ...prevState.activities,
                { type: 'intervention', description: '', response : { type: '' } }
            ]
        }));
    }
    handleRemoveActivity = (i) => {
        let activities = [...this.state.activities];
        activities.splice(i, 1);
        this.setState({
            activities: activities
        });
    }
    handleSelectedBehaviorChanged = (i) => (event, index, value) => {
        let activities = [...this.state.activities];
        activities.at(i).response.behavior = value;
        this.setState({
            activities: activities
        });
    }
    handlePositiveResponseDescriptionChanged = (i) => (event, value) => {
        let activities = [...this.state.activities];
        activities.at(i).response.positive = value;
        this.setState({
            activities: activities
        });
    }
    handleReinforceBeforeChanged = (i) => (event, index, value) => {
        let activities = [...this.state.activities];
        activities.at(i).response.reinforceBefore = value;
        this.setState({
            activities: activities
        });
    }
    handleReplacementChanged = (i) => (event, index, value) => {
        let activities = [...this.state.activities];
        activities.at(i).response.replacement = value;
        this.setState({
            activities: activities
        });
    }
    handleReinforceAfterChanged = (i) => (event, index, value) => {
        let activities = [...this.state.activities];
        activities.at(i).response.reinforceAfter = value;
        this.setState({
            activities: activities
        });
    }
    handleInterventionChanged = (i) => (event, index, value) => {
        let activities = [...this.state.activities];
        activities.at(i).response.intervention.description = value;
        this.setState({
            activities: activities
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
                        session={this.state}
                        newActivity={this.handleNewActivity}
                        removeActivity={this.handleRemoveActivity}
                        activityChanged={this.handleSelectedActivityChanged}
                        activityResponseChanged={this.handleSelectedActivityResponseChanged}
                        behaviorChanged={this.handleSelectedBehaviorChanged}
                        interventionChanged={this.handleInterventionChanged}
                        positiveResponseDescriptionChanged={this.handlePositiveResponseDescriptionChanged}
                        reinforceBeforeChanged={this.handleReinforceBeforeChanged}
                        replacementChanged={this.handleReplacementChanged}
                        reinforceAfterChanged={this.handleReinforceAfterChanged}
                        newIntervention={this.handleNewIntervention}
                    />
                )
                break;
            case 3:
                currentStep = (
                    <ConclusionForm
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        values={this.state}
                    />
                )
                break;
            default:
                break;
        }
        
        return (
            <React.Fragment>
                 <td>
                    {currentStep}
                </td>
                <td width="50px"></td>
                <td>
                    <NoteSummary 
                        values={this.state}/>
                </td>
            </React.Fragment>
        );
    }
}

export default NoteForm;
