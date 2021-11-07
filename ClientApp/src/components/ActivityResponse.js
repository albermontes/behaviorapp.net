import React, { Component } from 'react'
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

export class ActivityResponse extends Component {
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
    reinforcements = [
        "Praises",
        "Edibles items",
        "A give me five",
        "Time to play a video game",
        "Time to play outside in the yard",
        "Time to play in the common areas of the condo",
        "Time to play a favorite board game or toy",
    ];
    replacements = [
        "Accepting delay of attention",
        "Escape training",
        "Appropriate attention seeking",
        "Appropriate asking for tangible",
        "Accepting no response",
        "Tact training",
        "Turn-Taking skills", 
        "Social skills training",
        "Task completion"
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
    render() {
        const { handleDropDownChange, handleChange, values } = this.props;
        switch(values.activityResponse){
            case 'positive':
                return (
                    <div>
                        <h4>Positive Response</h4>
                        <TextField 
                            floatingLabelText="Description"
                            value={values.positiveResponse}
                            onChange={handleChange('positiveResponse')}>
                        </TextField>
                        <br/>
                        <h4>Reinforce before Replacement</h4>
                        <DropDownMenu 
                                value={values.reinforcementsBefore} 
                                onChange={handleDropDownChange('reinforcementsBefore')}>
                            {this.reinforcements.map(reinforce => 
                                <MenuItem value={reinforce}
                                        primaryText={reinforce} />    
                                )}
                        </DropDownMenu>
                        <br/>
                        <h4>Replacement</h4>
                        <DropDownMenu 
                                value={values.replacements} 
                                onChange={handleDropDownChange('replacements')}>
                            {this.replacements.map(replacement => 
                                <MenuItem value={replacement}
                                        primaryText={replacement} />    
                                )}
                        </DropDownMenu>
                        <br/>
                        <h4>Reinforce after Replacement</h4>
                        <DropDownMenu 
                                value={values.reinforcementsAfter} 
                                onChange={handleDropDownChange('reinforcementsAfter')}>
                            {this.reinforcements.map(reinforce => 
                                <MenuItem value={reinforce}
                                        primaryText={reinforce} />    
                                )}
                        </DropDownMenu>
                    </div>
                )
            case 'negative':
                return (
                    <div>
                        <h4>Behavior</h4>
                        <DropDownMenu 
                                value={values.behaviors} 
                                onChange={handleDropDownChange('behaviors')}>
                            {this.behaviors.map(behavior => 
                                <MenuItem value={behavior}
                                        primaryText={behavior} />    
                                )}
                        </DropDownMenu>
                        <br/>
                        <h4>Intervention</h4>
                        <DropDownMenu 
                                value={values.interventions} 
                                onChange={handleDropDownChange('interventions')}>
                            {this.interventions.map(intervention => 
                                <MenuItem value={intervention}
                                        primaryText={intervention} />    
                                )}
                        </DropDownMenu>
                    </div>   
                )
            default:
                return '';
        }   
    }
}

export default ActivityResponse
