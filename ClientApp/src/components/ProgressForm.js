import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton'; 
import Activity from './Activity';
export class ProgressForm extends Component {
    nextStep = e => {
        e.preventDefault();
        this.props.nextStep();
    }
    prevStep = e => {
        e.preventDefault();
        this.props.prevStep();
    }
    newActivity = e => {
        e.preventDefault();
        this.props.newActivity();
    }
    removeActivity = i => e => {
        e.preventDefault();
        this.props.removeActivity(i);
    }
    newIntervention = e => {
        e.preventDefault();
        this.props.newIntervention();
    }
    removeIntervention = i => e => {
        e.preventDefault();
        this.props.removeIntervention(i);
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
    interventions = [
        "DRA (Differential reinforcement alternative behavior)",
        "DRO (Differential reinforcement other behavior)",
        "DRI (Differential reinforcement of incompatible behavior)",
        "Planned ignoring",
        "Response block (Blocked the client for a few seconds, without restraint)",
        "Redirection to escape from demands",
        "Redirection to request for tangible",
        "Redirection to attention seeking",
        "Escape extinction",
        "Attention independent response delivery",
        "Environmental / Antecedent manipulations",
        "Incidental teaching",
        "Modeling",
        "Shaping",
        "Provides choices",
        "Premack Principle",
        "Task modification",
        "Alternative sensory-stimulation",
        "Non-contingent attention"
    ];
    render(){
        const { 
            session, 
            activityChanged,
            activityResponseChanged,
            behaviorChanged,
            interventionChanged,
            positiveResponseDescriptionChanged,
            reinforceBeforeChanged,
            replacementChanged,
            reinforceAfterChanged
        } = this.props;
        return (
            <MuiThemeProvider>
                <React.Fragment>
                    <AppBar title="Progress" />
                    <br/>
                    {session.activities.map(x => 
                        <Activity
                            activityNumber={session.activities.indexOf(x) + 1}
                            activities={this.activities}
                            interventions={this.interventions}
                            activity={x}
                            activityChanged={activityChanged(session.activities.indexOf(x))}
                            activityResponseChanged={activityResponseChanged(session.activities.indexOf(x))}
                            removeActivity={this.removeActivity(session.activities.indexOf(x))}
                            removeIntervention={this.removeActivity(session.activities.indexOf(x))}
                            behaviorChanged={behaviorChanged(session.activities.indexOf(x))}
                            positiveResponseDescriptionChanged={positiveResponseDescriptionChanged(session.activities.indexOf(x))}
                            reinforceBeforeChanged={reinforceBeforeChanged(session.activities.indexOf(x))}
                            replacementChanged={replacementChanged(session.activities.indexOf(x))}
                            reinforceAfterChanged={reinforceAfterChanged(session.activities.indexOf(x))}
                        />
                    )}
                    <React.Fragment>
                        <td>
                            <RaisedButton
                                label="New Activity"
                                primary={false}
                                onClick={this.newActivity}
                            />
                        </td>
                        <td>&nbsp;&nbsp;</td>
                        <td>
                            <RaisedButton
                                label="New Intervention"
                                primary={false}
                                onClick={this.newIntervention}
                            />
                        </td>
                    </React.Fragment>
                    <br/>
                    <br/>
                    <React.Fragment>
                        <td>
                            <RaisedButton
                                label="Previous"
                                primary={true}
                                onClick={this.prevStep}
                            />
                        </td>
                        <td>&nbsp;&nbsp;</td>
                        <td>
                            <RaisedButton
                                label="Next"
                                primary={true}
                                onClick={this.nextStep}
                            />
                        </td>
                    </React.Fragment>
                </React.Fragment>
            </MuiThemeProvider>
        );
    }
}

export default ProgressForm;