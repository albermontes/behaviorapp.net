import React from "react";
import { OK_TAG, BAD_TAG, activityDescriptions } from './data'
import deleteIcon from '../img/ba-icon-delete.svg';
import MyPositiveResponse from "./MyPositiveResponse";
import MyNegativeResponse from "./MyNegativeResponse";

export default function MyActivity(props){
    const { index,
            interventions, 
            description,
            eventTrigger,
            onEventTriggerChanged, 
            response, 
            positiveResponse, 
            reinforceBefore, 
            replacement, 
            reinforceAfter, 
            onRemove,
            onRemoveIntervention,
            onInterventionDescriptionChange,
            onBehaviorChange,
            onInterventionResponseChange, 
            onDescriptionChange,
            onResponseChange,
            onPositiveResponseChange,
            onReinforceBeforeChange,
            onReplacementChange,
            onReinforceAfterChange,
            onInterventionPositiveResponseChange,
            onInterventionReinforceBeforeChange,
            onInterventionReplacementChange,
            onInterventionReinforceAfterChange,
            reinforceResponse, 
            onReinforceResponseChange,
            onReinforceDescriptionChange,
            onInterventionReinforceResponseChange,
            onInterventionReinforceDescriptionChange
    } = props;

    const responseSelectionElement = 
        description == ''
        ? ''
        :   <div class="pl-3">
                {description == 'other' 
                ? <label>What type of event was?</label>
                : <label>How was the response?</label>}

                <div className="form-group d-flex"   
                        onChange={onResponseChange}>
                    <label className="container_radio version_2">
                        {OK_TAG}
                        <input className="required valid"
                                type="radio" 
                                value={OK_TAG} 
                                name={'act' + index} 
                                checked={response.label == OK_TAG}/>
                        <span className="checkmark"></span>
                    </label>
                    <label className="container_radio version_2 ml-5">
                        {BAD_TAG}
                        <input className="required valid"
                                type="radio" 
                                value={BAD_TAG} 
                                name={'act' + index} 
                                checked={response.label == BAD_TAG}/>
                        <span className="checkmark"></span>
                    </label>
                </div>
            </div>      

    const responseActionsElement = 
            response.label == OK_TAG 
            ? <MyPositiveResponse 
                positiveResponse={positiveResponse}
                onPositiveResponseChange={onPositiveResponseChange}
                reinforceBefore={reinforceBefore}
                onReinforceBeforeChange={onReinforceBeforeChange}
                replacement={replacement}
                onReplacementChange={onReplacementChange}
                reinforceAfter={reinforceAfter}
                onReinforceAfterChange={onReinforceAfterChange}
                reinforceResponse={reinforceResponse}
                onReinforceDescriptionChange={onReinforceDescriptionChange}
                onReinforceResponseChange={onReinforceResponseChange}
            />
            : response.label == BAD_TAG
                ? <MyNegativeResponse 
                    actIndex={index}
                    interventions={interventions}
                    onRemove={onRemoveIntervention}
                    onResponseChange={onInterventionResponseChange}
                    onDescriptionChange={onInterventionDescriptionChange}
                    onBehaviorChange={onBehaviorChange}
                    onPositiveResponseChange={onInterventionPositiveResponseChange}
                    onReinforceBeforeChange={onInterventionReinforceBeforeChange}
                    onReplacementChange={onInterventionReplacementChange}
                    onReinforceAfterChange={onInterventionReinforceAfterChange}
                    onReinforceResponseChange={onInterventionReinforceResponseChange}
                    onReinforceDescriptionChange={onInterventionReinforceDescriptionChange}
                />
                : ''

    const activityElement = description == 'other'
        ?   <div>
                <h3 className="ba-card-number">
                    {index + 1 + ' Event'}
                </h3>
                <div className="form-group">
                    <label>Describe what triggers the event</label>
                    <textarea className="form-control"
                            placeholder="Description of what is this..."
                            value={eventTrigger}
                            onChange={onEventTriggerChanged}/>
                </div>
            </div>
        :  <div className="form-group">
                <label>What Activity was scheduled?</label>
                <div className="styled-select clearfix">
                    <div style={{'display': 'flex'}}>
                        <h3 className="ba-card-number">
                            {index + 1}
                        </h3>
                        <select className="nice-select nice-select_2 wide required"
                                value={description}
                                onChange={onDescriptionChange} >
                            {activityDescriptions.map(x =>
                                <option value={x}
                                        hidden={x == ''}>
                                    {x == '' ? 'Select an Activity' : x}
                                </option>  
                            )}
                        </select>
                    </div>
                </div>
            </div>

    return (
        <div  className="shadow p-4 pb-5 mb-3 gnx-bck-darkgray rounded-4">
            <div className="float-right">
                <button className="ba-button ba-button-icon ba-button-action"
                        onClick={onRemove}>
                    <img src={deleteIcon} 
                            alt="" 
                            width="13"/>
                </button>
            </div>
            <br/>
            {activityElement}
            <div>
                {responseSelectionElement}
                {responseActionsElement}
            </div>
        </div>
    )
}