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
        :   <div>
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
        ?   <div className="form-group">
                <label>Describe what triggers the event</label>
                <textarea className="form-control"
                        placeholder="Description of what is this..."
                        value={eventTrigger}
                        onChange={onEventTriggerChanged}/>
            </div>
        :  <div className="form-group">
                <label>What Activity was scheduled?</label>
                <div className="styled-select clearfix">
                    <select className="nice-select wide required"
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

    return (
        <div  className="shadow p-4 mb-3 gnx-bck-darkgray ba-hover-darkgray">
            <div class="ml-3">
                <div className="d-flex justify-content-between">
                    <div>
                        <h4 class="font-weight-bold">{(index + 1) + (description == '' 
                            ? ' Activity' 
                            : description == 'other'
                                ? ' Other Event'
                                : ' ' + description) }
                        </h4>
                        <div className="pl-4">
                            {response.label}
                        </div>
                    </div>
                    <div>
                        <button className="ba-button ba-button ba-button-action"
                                onClick={onRemove}>
                            <img src={deleteIcon} 
                                    alt="" 
                                    width="13"/>
                        </button>
                    </div>
                </div>
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