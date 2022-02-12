import React, { useState } from 'react';
import '../css/site.css';
import logo from '../img/logo.png';
import left from '../img/ba-arrow-left.svg';
import right from '../img/ba-arrow-right.svg';
import MyNoteSummary from './MyNoteSummary.js';
import MyActivity from './MyActivity';
import { locations, caregivers, BAD_TAG } from './data';

export default function MyNote(){
    const [activities, setActivities] = useState([]);
    const [step, setStep] = useState(1);
    const [detailInfo, setDetailInfo] = useState({
        location: '', caregivers: [], antecedent: '', 
        healthSummary: '', familyFeedback: '', caregiverCompetency: '' 
    });

    const addActivity = () => {
        setActivities([
            ...activities,
            { 
                description: '',
                response: { label: '', reinforceResponse: { label: '', description: '' } },
                interventions: [] 
            }
        ])
    }
    const addOtherEvent = () => {
        setActivities([
            ...activities,
            { 
                description: 'other',
                eventTrigger: '',
                response: { label: '', reinforceResponse: { label: '', description: '' } },
                interventions: [] 
            }
        ])
    }
    const removeActivity = i => e => {
        e.preventDefault();
        const activitiesCopy = [...activities];
        activitiesCopy.splice(i, 1);
        setActivities(activitiesCopy);
    }
    const removeIntervention = i => int => e => {
        e.preventDefault();
        const activitiesCopy = [...activities];
        activitiesCopy.at(i).interventions.splice(int);
        if(int > 0)
            activitiesCopy.at(i).interventions.at(int-1).response = { label: '', reinforceResponse: { label: '', description: '' } };
        else
            activitiesCopy.at(i).response = { label: '', reinforceResponse: { label: '', description: '' } };
        setActivities(activitiesCopy);
    }
    const setResponse = i => e => {
        const activitiesCopy = [...activities];
        activitiesCopy.at(i).response.label = e.target.value;
        if(e.target.value == BAD_TAG){
            activitiesCopy.at(i).interventions.splice(0,
                0,{
                    behavior: [],
                    description: [],
                    response: { label: '', reinforceResponse: { label: '', description: '' } }
            });
        }else{
            activitiesCopy.at(i).interventions.splice(0);
        }
        setActivities(activitiesCopy);
    }
    const setInterventionResponse = i => int => e => {
        const activitiesCopy = [...activities];
        activitiesCopy.at(i).interventions.at(int).response.label = e.target.value;
        if(e.target.value == BAD_TAG){
            activitiesCopy.at(i).interventions.splice(int+1,
                activitiesCopy.at(i).interventions.length,{
                    behavior: [],
                    description: [],
                    response: { label: '', reinforceResponse: { label: '', description: '' } }
            });
        }else{
            activitiesCopy.at(i).interventions.splice(int+1);
        }
        setActivities(activitiesCopy);
    }
    const setDescription = i => e => {
        const activitiesCopy = [...activities];
        activitiesCopy.at(i).description = e.target.value;
        activitiesCopy.at(i).response = { label: '', interventions: [], reinforceResponse: { label: '', description: '' } }
        setActivities(activitiesCopy);
    }
    const setEventTrigger = i => e => {
        const activitiesCopy = [...activities];
        activitiesCopy.at(i).eventTrigger = e.target.value;
        activitiesCopy.at(i).response = { label: '', interventions: [], reinforceResponse: { label: '', description: '' } }
        setActivities(activitiesCopy);
    }
    const setInterventionDescription = i => int => e => {
        const activitiesCopy = [...activities];
        activitiesCopy.at(i).interventions.at(int).description = e;
        activitiesCopy.at(i).interventions.at(int).response = { label: '', reinforceResponse: { label: '', description: '' } };
        activitiesCopy.at(i).interventions.splice(int+1);
        setActivities(activitiesCopy);
    }
    const setInterventionBehavior = i => int => e => {
        const activitiesCopy = [...activities];
        activitiesCopy.at(i).interventions.at(int).behavior = e;
        activitiesCopy.at(i).interventions.at(int).response = { label: '', reinforceResponse: { label: '', description: '' } };
        activitiesCopy.at(i).interventions.splice(int+1);
        setActivities(activitiesCopy);
    }
    const setResponseDescription = i => e => {
        const activitiesCopy = [...activities];
        activitiesCopy.at(i).response.description = e.target.value;
        setActivities(activitiesCopy);
    }
    const setResponseReinforceBefore = i => e => {
        const activitiesCopy = [...activities];
        activitiesCopy.at(i).response.reinforceBefore = e;
        setActivities(activitiesCopy);
    }
    const setResponseReinforceAfter = i => e => {
        const activitiesCopy = [...activities];
        activitiesCopy.at(i).response.reinforceAfter = e;
        setActivities(activitiesCopy);
    }
    const setReinforceResponse = i => e => {
        const activitiesCopy = [...activities];
        activitiesCopy.at(i).response.reinforceResponse.label = e.target.value;
        setActivities(activitiesCopy);
    }
    const setReinforceDescription = i => e => {
        const activitiesCopy = [...activities];
        activitiesCopy.at(i).response.reinforceResponse.description = e.target.value;
        setActivities(activitiesCopy);
    }
    const setResponseReplacement = i => e => {
        const activitiesCopy = [...activities];
        activitiesCopy.at(i).response.replacement = e;
        setActivities(activitiesCopy);
    }
    const setInterventionNegativeResponse = i => int => e => {
        const activitiesCopy = [...activities];
        activitiesCopy.at(i).interventions.at(int).behaviorDescription = e.target.value;
        setActivities(activitiesCopy);
    }
    const setInterventionPositiveResponse = i => int => e => {
        const activitiesCopy = [...activities];
        activitiesCopy.at(i).interventions.at(int).response.description = e.target.value;
        setActivities(activitiesCopy);
    }
    const setInterventionReinforceBefore = i => int => e => {
        const activitiesCopy = [...activities];
        activitiesCopy.at(i).interventions.at(int).response.reinforceBefore = e;
        setActivities(activitiesCopy);
    }
    const setInterventionReinforceResponse = i => int => e => {
        const activitiesCopy = [...activities];
        activitiesCopy.at(i).interventions.at(int).response.reinforceResponse.label = e.target.value;
        setActivities(activitiesCopy);
    }
    const setInterventionReinforceDescription = i => int => e => {
        const activitiesCopy = [...activities];
        activitiesCopy.at(i).interventions.at(int).response.reinforceResponse.description = e.target.value;
        setActivities(activitiesCopy);
    }
    const setInterventionReplacement = i => int => e => {
        const activitiesCopy = [...activities];
        activitiesCopy.at(i).interventions.at(int).response.replacement = e;
        setActivities(activitiesCopy);
    }
    const setInterventionReinforceAfter = i => int => e => {
        const activitiesCopy = [...activities];
        activitiesCopy.at(i).interventions.at(int).response.reinforceAfter = e;
        setActivities(activitiesCopy);
    }
    const setLocation = e => {
        setDetailInfo(prev => ({
            ...prev, location: e.target.value 
        }))
    }
    const setAntecedent = e => {
        setDetailInfo({
            location: detailInfo.location,
            caregivers: detailInfo.caregivers,
            antecedent: e.target.value,
            healthSummary: detailInfo.healthSummary,
            familyFeedback: detailInfo.familyFeedback,
            caregiverCompetency: detailInfo.caregiverCompetency
        })
    }
    const setHealthSummary = e => {
        setDetailInfo({
            location: detailInfo.location,
            caregivers: detailInfo.caregivers,
            antecedent: detailInfo.antecedent,
            healthSummary: e.target.value,
            familyFeedback: detailInfo.familyFeedback,
            caregiverCompetency: detailInfo.caregiverCompetency
        })
    }
    const setFamilyFeedback = e => {
        setDetailInfo({
            location: detailInfo.location,
            caregivers: detailInfo.caregivers,
            antecedent: detailInfo.antecedent,
            healthSummary: detailInfo.healthSummary,
            familyFeedback: e.target.value,
            caregiverCompetency: detailInfo.caregiverCompetency
        })
    }
    const setCaregiverCompetency = e => {
        setDetailInfo({
            location: detailInfo.location,
            caregivers: detailInfo.caregivers,
            antecedent: detailInfo.antecedent,
            healthSummary: detailInfo.healthSummary,
            familyFeedback: detailInfo.familyFeedback,
            caregiverCompetency: e.target.value
        })
    }

    const setCaregiver = e => {
        const caregiversCopy = [...detailInfo.caregivers];
        if(e.target.checked){
            caregiversCopy.splice(caregiversCopy.length, 0, e.target.value);
        }else{
            caregiversCopy.splice(caregiversCopy.indexOf(e.target.value), 1);
        }
        setDetailInfo(prev => ({
            ...prev, caregivers: caregiversCopy
        }))
    }

    const prevStep = e => {
        e.preventDefault();
        setStep(step - 1);
    }
    const nextStep = e => {
        e.preventDefault();
        if(step < 3)
            setStep(step + 1);
    }

    var note = '';
    switch(step){
        case 1:
            note =  <div className="step">
                        <h3 class="main_question">
                            <strong>1/3</strong>
                            <mark class="gnx-bck-white">
                                Introduction
                            </mark>
                        </h3>
                        <div className="form-group">
                            <div className="styled-select clearfix">
                                <select className="nice-select wide required" 
                                        placeholder="Select a location"
                                        value={detailInfo.location}
                                        onChange={setLocation}>
                                    {locations.map(x => 
                                        <option value={x}
                                                hidden={x == ''}>
                                            {x == '' ? 'Select a Location' : x}
                                        </option>    
                                    )}
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Caregiver</label>
                            {caregivers.map(x => 
                                <label className="container_check">
                                    {x}
                                    <input className="required valid" 
                                            type="checkbox" 
                                            value={x}
                                            onChange={setCaregiver}
                                            checked={detailInfo.caregivers.indexOf(x) > -1}/>
                                    <span className="checkmark"></span>
                                </label>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Antecedent</label>
                            <textarea className="form-control"
                                    placeholder="Description of what is this..."
                                    value={detailInfo.antecedent}
                                    onChange={setAntecedent}/>
                        </div>
                    </div>
            break;
        case 2:
            note =  <div className="step">
                        <h3 class="main_question">
                            <strong>2/3</strong>
                            <mark class="gnx-bck-white">
                                Activities
                            </mark>
                        </h3>
                        { activities.map((a, i) => (
                                <MyActivity
                                    index={i}
                                    response={a.response}
                                    description={a.description}
                                    eventTrigger={a.eventTrigger}
                                    onEventTriggerChanged={setEventTrigger(i)}
                                    positiveResponse={a.response.description}
                                    reinforceBefore={a.response.reinforceBefore}
                                    replacement={a.response.replacement}
                                    reinforceAfter={a.response.reinforceAfter}
                                    interventions={a.interventions}
                                    onRemove={removeActivity(i)}
                                    onPositiveResponseChange={setResponseDescription(i)}
                                    onReinforceBeforeChange={setResponseReinforceBefore(i)}
                                    onReplacementChange={setResponseReplacement(i)}
                                    onReinforceAfterChange={setResponseReinforceAfter(i)}
                                    onResponseChange={setResponse(i)}
                                    onDescriptionChange={setDescription(i)}
                                    onBehaviorChange={setInterventionBehavior(i)}
                                    onInterventionResponseChange={setInterventionResponse(i)}
                                    onInterventionDescriptionChange={setInterventionDescription(i)}
                                    onRemoveIntervention={removeIntervention(i)}
                                    onInterventionNegativeResponseChange={setInterventionNegativeResponse(i)}
                                    onInterventionPositiveResponseChange={setInterventionPositiveResponse(i)}
                                    onInterventionReinforceBeforeChange={setInterventionReinforceBefore(i)}
                                    onInterventionReplacementChange={setInterventionReplacement(i)}
                                    onInterventionReinforceAfterChange={setInterventionReinforceAfter(i)}
                                    reinforceResponse={a.response.reinforceResponse}
                                    onReinforceResponseChange={setReinforceResponse(i)}
                                    onReinforceDescriptionChange={setReinforceDescription(i)}
                                    onInterventionReinforceResponseChange={setInterventionReinforceResponse(i)}
                                    onInterventionReinforceDescriptionChange={setInterventionReinforceDescription(i)}
                                />
                            ))}
                        <div class="text-right">
                            <button class="ba-button ba-button-transparent"
                                    onClick={addActivity}>
                                ADD SCHED. ACTIVITY
                            </button>
                        </div>   
                        <div class="text-right">
                            <button class="ba-button ba-button-transparent"
                                    onClick={addOtherEvent}>
                                ADD OTHER EVENT
                            </button>
                        </div>    
                    </div>
            break;
        case 3:
            note =  <div className="step">
                        <h3 class="main_question">
                            <strong>3/3</strong>
                            <mark class="gnx-bck-white">
                                Conclusion
                            </mark>
                        </h3>
                        <div className="form-group">
                            <label>Health summary</label>
                            <textarea className="form-control"
                                    placeholder="Description of what is this..."
                                    value={detailInfo.healthSummary}
                                    onChange={setHealthSummary}/>
                        </div>
                        <div className="form-group">
                            <label>Family feedback</label>
                            <textarea className="form-control"
                                    placeholder="Description of what is this..."
                                    value={detailInfo.familyFeedback}
                                    onChange={setFamilyFeedback}/>
                        </div>
                        <div className="form-group">
                            <label>Caregiver competency</label>
                            <textarea className="form-control"
                                    placeholder="Description of what is this..."
                                    value={detailInfo.caregiverCompetency}
                                    onChange={setCaregiverCompetency}/>
                        </div>
                    </div>
            break;
    }

    return (
        <div className="container-fluid full-height">
            <div className="row no-gutters row-height">
                <div className="col-lg-8 gnx-bck-dark content-left">
                    <div className="content-left-wrapper">
                        <div className="d-flex justify-content-between p-3">
                            <div>
                                <a id="logo" href="/">
                                    <img src={logo} alt="" width="49" height="35"/>
                                </a>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between p-2 gnx-bck-darkgray border-bottom">
                            <h3 className="p-3">
                                <a className="ba-home-icon pr-3">
                                    <img src={left} width="16" />
                                </a>
                                Jhon
                            </h3>
                            <div className="px-2 py-3">
                                <a href="#" className="ba-arrow-r">
                                    <span className="pr-2">Download PDF</span>
                                    <img src={right} width="20" />
                                </a>
                            </div>
                        </div>
                        <div class="d-flex flex-wrap py-1 gnx-bck-darkgray">
                            <div class="px-3 py-2">
                                Daily Progress Notes<br/>
                                <span class="font-weight-bold">DEC 2021</span>
                            </div>
                            <div class="px-3 py-2">
                                Recipient's name<br/>
                                <span class="font-weight-bold">Jhon Doe</span>
                            </div>
                            <div class="px-3 py-2">
                                Behavior Analyst<br/>
                                <span class="font-weight-bold">Anna Valdes</span>
                            </div>
                            <div class="px-3 py-2">
                                Medicaid #<br/>
                                <span class="font-weight-bold">00000000</span>
                            </div>
                            <div class="px-3 py-2">
                                RBT #<br/>
                                <span class="font-weight-bold">Mercedes Sosa</span>
                            </div>
                        </div>
                        <div class="d-flex py-2 gnx-bck-lightgray gnx-bb-dark">
                            <div class="px-3">
                                DEC 3, 2021
                            </div>
                        </div>
                        <div>
                            <div className="p-3">
                                <MyNoteSummary note={JSON.stringify({
                                        detailInfo: detailInfo,
                                        activities: activities
                                    })}/>
                              
                               <pre className="gnx-color-lightgray">
                                    {JSON.stringify({
                                            detailInfo: detailInfo,
                                            activities: activities
                                       }, null, 2)}
                                </pre>
                            </div>
                        </div>
                        <div class="footer">
                            <div class="d-flex flex-wrap px-3 py-2">
                                <div class="pr-3 pb-2 text-truncate">
                                    <span class="text-uppercase">Legend</span>
                                </div>
                                <div class="pr-3 pb-2 text-truncate">
                                    <div class="gnx-square gnx-bck-introduction"></div>
                                    <span>&nbsp;Introduction</span>
                                </div>
                                <div class="pr-3 pb-2 text-truncate">
                                    <div class="gnx-square gnx-bck-activities"></div>
                                    <span>&nbsp;Activities</span>
                                </div>
                                <div class="pr-3 pb-2 text-truncate">
                                    <div class="gnx-square gnx-bck-behaviors"></div>
                                    <span>&nbsp;Behaviors</span>
                                </div>
                                <div class="pr-3 pb-2 text-truncate">
                                    <div class="gnx-square gnx-bck-interventions"></div>
                                    <span>&nbsp;Interventions</span>
                                </div>
                                <div class="pr-3 pb-2 text-truncate">
                                    <div class="gnx-square gnx-bck-transitions"></div>
                                    <span>&nbsp;Transitions</span>
                                </div>
                                <div class="pr-3 pb-2 text-truncate">
                                    <div class="gnx-square gnx-bck-replacements"></div>
                                    <span>&nbsp;Replacements</span>
                                </div>
                                <div class="pr-3 pb-2 text-truncate">
                                    <div class="gnx-square gnx-bck-reinforcements"></div>
                                    <span>&nbsp;Reinforcement</span>
                                </div>
                                <div class="pr-3 pb-2 text-truncate">
                                    <div class="gnx-square gnx-bck-conclusion"></div>
                                    <span>&nbsp;Conclusion</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 px-3 content-right" id="start">
                    <div id="wizard_container">
                        <div id="top-wizard">
                            <div id="progressbar"></div>
                        </div>
                        <div id="middle-wizard">
                            {note}
                            <div id="bottom-wizard">
                                <button className="backward"
                                        onClick={prevStep} 
                                        hidden={step == 1}>
                                    PREV
                                </button>
                                <button className="forward"
                                        onClick={nextStep} 
                                        hidden={step == 3}>
                                    NEXT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}