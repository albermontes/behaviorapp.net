import React, { useState, useEffect } from 'react';
import '../css/site.css';
import deleteIcon from '../img/ba-icon-delete.svg';
import logo from '../img/logo.png';
import left from '../img/ba-arrow-left.svg';
import right from '../img/ba-arrow-right.svg';

const activityDescriptions = [
    "",
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
const interventionDescriptions = [
    "",
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
const behaviorDescriptions = [
    "",
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
const reinforceDescriptions = [
    "",
    "Praises",
    "Edibles items",
    "A give me five",
    "Time to play a video game",
    "Time to play outside in the yard",
    "Time to play in the common areas of the condo",
    "Time to play a favorite board game or toy"
];
const replacementDescriptions = [
    "",
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

const locations = [
    '',
    'At home',
    'At school',
    'In the park'
];

const caregivers = [
    'Mother',
    'Father',
    'Grandmother'    
]

const BAD_TAG = 'NEGATIVE';
const OK_TAG = 'POSITIVE';

function MyNoteSummary(props){
    const { note } = props;
    const [summary, setSummary] = useState('');

    useEffect(() => {
        fetch('notesummary?note=' + note)
            .then(response => response.json())
            .then(responseJson => {
                setSummary(responseJson.summary)
            })
    }, [note])

    return <p className="gnx-color-lightgray" 
                dangerouslySetInnerHTML={{ __html: summary }}>
            </p>
}

function MyNote(){
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
                response: { label: '' },
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
            activitiesCopy.at(i).interventions.at(int-1).response = { label: '' };
        else
            activitiesCopy.at(i).response = { label: '' };
        setActivities(activitiesCopy);
    }
    const setResponse = i => e => {
        const activitiesCopy = [...activities];
        activitiesCopy.at(i).response = { label: e.target.value };
        if(e.target.value == BAD_TAG){
            activitiesCopy.at(i).interventions.splice(0,
                0,{
                    description: '',
                    response: { label: '' }
            });
        }else{
            activitiesCopy.at(i).interventions.splice(0);
        }
        setActivities(activitiesCopy);
    }
    const setInterventionResponse = i => int => e => {
        const activitiesCopy = [...activities];
        activitiesCopy.at(i).interventions.at(int).response = { 
            label: e.target.value };
        if(e.target.value == BAD_TAG){
            activitiesCopy.at(i).interventions.splice(int+1,
                activitiesCopy.at(i).interventions.length,{
                    description: '',
                    response: { label: '' }
            });
        }else{
            activitiesCopy.at(i).interventions.splice(int+1);
        }
        setActivities(activitiesCopy);
    }
    const setDescription = i => e => {
        const activitiesCopy = [...activities];
        activitiesCopy.at(i).description = e.target.value;
        activitiesCopy.at(i).response = { label: '', interventions: [] }
        setActivities(activitiesCopy);
    }
    const setInterventionDescription = i => int => e => {
        const activitiesCopy = [...activities];
        activitiesCopy.at(i).interventions.at(int).description = e.target.value;
        activitiesCopy.at(i).interventions.at(int).response = { label: '' };
        activitiesCopy.at(i).interventions.splice(int+1);
        setActivities(activitiesCopy);
    }
    const setInterventionBehavior = i => int => e => {
        const activitiesCopy = [...activities];
        activitiesCopy.at(i).interventions.at(int).behavior = e.target.value;
        activitiesCopy.at(i).interventions.at(int).response = { label: '' };
        activitiesCopy.at(i).interventions.at(int).description = '';
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
        activitiesCopy.at(i).response.reinforceBefore = e.target.value;
        setActivities(activitiesCopy);
    }
    const setResponseReinforceAfter = i => e => {
        const activitiesCopy = [...activities];
        activitiesCopy.at(i).response.reinforceAfter = e.target.value;
        setActivities(activitiesCopy);
    }
    const setResponseReplacement = i => e => {
        const activitiesCopy = [...activities];
        activitiesCopy.at(i).response.replacement = e.target.value;
        setActivities(activitiesCopy);
    }
    const setInterventionPositiveResponse = i => int => e => {
        const activitiesCopy = [...activities];
        activitiesCopy.at(i).interventions.at(int).response.description = e.target.value;
        setActivities(activitiesCopy);
    }
    const setInterventionReinforceBefore = i => int => e => {
        const activitiesCopy = [...activities];
        activitiesCopy.at(i).interventions.at(int).response.reinforceBefore = e.target.value;
        setActivities(activitiesCopy);
    }
    const setInterventionReplacement = i => int => e => {
        const activitiesCopy = [...activities];
        activitiesCopy.at(i).interventions.at(int).response.replacement = e.target.value;
        setActivities(activitiesCopy);
    }
    const setInterventionReinforceAfter = i => int => e => {
        const activitiesCopy = [...activities];
        activitiesCopy.at(i).interventions.at(int).response.reinforceAfter = e.target.value;
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
                                        value={detailInfo.location}
                                        onChange={setLocation}>
                                    {locations.map(x => 
                                        <option value={x}>{x}</option>    
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
                                    onInterventionPositiveResponseChange={setInterventionPositiveResponse(i)}
                                    onInterventionReinforceBeforeChange={setInterventionReinforceBefore(i)}
                                    onInterventionReplacementChange={setInterventionReplacement(i)}
                                    onInterventionReinforceAfterChange={setInterventionReinforceAfter(i)}
                                />
                            ))}
                        <div class="text-right">
                            <button class="ba-button ba-button-transparent"
                                    onClick={addActivity}>
                                ADD ACTIVITY
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
                        <div className="d-flex">
                            <div className="p-3">
                                <MyNoteSummary note={JSON.stringify({
                                        detailInfo: detailInfo,
                                        activities: activities
                                    })}/>
                                {/*
                                <pre className="gnx-color-lightgray">
                                    {JSON.stringify({
                                            introduction: introduction,
                                            activities: activities,
                                            conclusion: conclusion
                                       }, null, 2)}
                                </pre>
                                */}
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
function MyIntervention(props){
    const { index, actIndex, description, onDescriptionChange,
            behavior, onBehaviorChange,
            response, onResponseChange,
            positiveResponse, onPositiveResponseChange,
            reinforceBefore, onReinforceBeforeChange,
            replacement, onReplacementChange,
            reinforceAfter, onReinforceAfterChange
    } = props;
    
    const positiveElement = response.label == OK_TAG
        ? <MyPositiveResponse
                positiveResponse={positiveResponse}
                onPositiveResponseChange={onPositiveResponseChange}
                reinforceBefore={reinforceBefore}
                onReinforceBeforeChange={onReinforceBeforeChange}
                replacement={replacement}
                onReplacementChange={onReplacementChange}
                reinforceAfter={reinforceAfter}
                onReinforceAfterChange={onReinforceAfterChange}
            />
        : ''
        const responseSelectionElement = description == ''
        ? ''
        :   <div className="form-group d-flex"   
                    onChange={onResponseChange}
                    hidden={description == ''}>
                <label className="container_radio version_2">
                    {OK_TAG}
                    <input className="required valid"
                            type="radio" 
                            value={OK_TAG} 
                            name={'act' + actIndex + '-int' + index} 
                            checked={response.label == OK_TAG}/>
                    <span className="checkmark"></span>
                </label>
                <label className="container_radio version_2 ml-5">
                    {BAD_TAG}
                    <input className="required valid"
                            type="radio" 
                            value={BAD_TAG} 
                            name={'act' + actIndex + '-int' + index} 
                            checked={response.label == BAD_TAG}/>
                    <span className="checkmark"></span>
                </label>
            </div>

    return (
        <div>
            <MyBehavior 
                behavior={behavior}
                onBehaviorChange={onBehaviorChange}
            />
             <div className="form-group">
                <div className="styled-select clearfix">
                    <select className="nice-select wide required" 
                            onChange={onDescriptionChange} 
                            value={description}>
                        {interventionDescriptions.map(a =>
                            <option value={a}>{a}</option>
                        )}
                    </select>
                </div>
            </div>
            {responseSelectionElement}
            {positiveElement}
        </div>
    )
}
function MyActivity(props){
    const { index,
            interventions, 
            description, 
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
            onInterventionReinforceAfterChange
    } = props;

    const responseSelectionElement = description == ''
        ? ''
        :  <div className="form-group d-flex"   
                    onChange={onResponseChange}
                    hidden={description == ''}>
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

    const responseActionsElement = description == ''
        ? ''
        :  response.label == OK_TAG 
            ? <MyPositiveResponse 
                positiveResponse={positiveResponse}
                onPositiveResponseChange={onPositiveResponseChange}
                reinforceBefore={reinforceBefore}
                onReinforceBeforeChange={onReinforceBeforeChange}
                replacement={replacement}
                onReplacementChange={onReplacementChange}
                reinforceAfter={reinforceAfter}
                onReinforceAfterChange={onReinforceAfterChange}
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
                />
                : ''

    return (
        <div  className="shadow p-3 mb-3 gnx-bck-darkgray ba-hover-darkgray">
            <div>
                <div className="d-flex justify-content-between">
                    <div>
                        <h5>{(index + 1) + (description == '' 
                            ? ' Activity' 
                            : ' ' + description) }
                        </h5>
                        <div className="pl-4">
                            {response.label}
                        </div>
                    </div>
                    <div className="pt-2">
                        <button className="pt-2 ba-button ba-button ba-button-action"
                                onClick={onRemove}>
                            <img src={deleteIcon} 
                                    alt="" 
                                    width="13"/>
                        </button>
                    </div>
                </div>
            </div>
            <br/>
            {/* all selects are rendering wrong */}
            <div className="form-group">
                <div className="styled-select clearfix">
                    <select className="nice-select wide required"
                            value={description}
                            onChange={onDescriptionChange} >
                        {activityDescriptions.map(a =>
                            <option value={a}>{a}</option>
                        )}
                    </select>
                </div>
            </div>
            <div>
                {responseSelectionElement}
                {responseActionsElement}
            </div>
        </div>
    )
}
function MyPositiveResponse(props){
    const { positiveResponse, onPositiveResponseChange,
            reinforceBefore, onReinforceBeforeChange,
            replacement, onReplacementChange,
            reinforceAfter, onReinforceAfterChange
    } = props; 
    return (
        <div>
            <div className="form-group">
                <label>Response description</label>
                <textarea className="form-control"
                        placeholder="Description of what is this..."
                        value={positiveResponse}
                        onChange={onPositiveResponseChange}/>
            </div>
            <div class="form-group mt-5">
                <div class="styled-select clearfix">
                    <select className="nice-select wide required"
                            value={reinforceBefore}
                            onChange={onReinforceBeforeChange} >
                        {reinforceDescriptions.map(x =>
                            <option value={x}>{x}</option>
                        )}
                    </select>
                </div>
            </div>
            <div class="form-group">
                <div class="styled-select clearfix">
                    <select className="nice-select wide required"
                            value={replacement}
                            onChange={onReplacementChange} >
                        {replacementDescriptions.map(x =>
                            <option value={x}>{x}</option>
                        )}
                    </select>
                </div>
            </div>
            <div class="form-group">
                <div class="styled-select clearfix">
                    <select className="nice-select wide required"
                            value={reinforceAfter}
                            onChange={onReinforceAfterChange} >
                        {reinforceDescriptions.map(x =>
                            <option value={x}>{x}</option>
                        )}
                    </select>
                </div>
            </div>
        </div>
    )
}
function MyNegativeResponse(props){
    const { actIndex,
            interventions, 
            onRemove,
            onResponseChange, 
            onDescriptionChange, 
            onBehaviorChange, 
            onPositiveResponseChange,
            onReinforceBeforeChange,
            onReplacementChange,
            onReinforceAfterChange 
    } = props;
    
    return (
        <div>
            { interventions.map((a, i) => (
                    <div>
                        <div className="d-flex justify-content-between">
                            <div>
                                <h5>{a.behavior}</h5>
                            </div>
                            <div className="pt-2">
                                <button className="pt-2 ba-button ba-button ba-button-action"
                                        onClick={onRemove(i)}>
                                    <img src={deleteIcon} 
                                            alt="" 
                                            width="13"/>
                                </button>
                            </div>
                        </div>
                        <MyIntervention
                            actIndex={actIndex}
                            index={i}
                            response={a.response}
                            onResponseChange={onResponseChange(i)}
                            behavior={a.behavior}
                            onBehaviorChange={onBehaviorChange(i)}
                            description={a.description}
                            onDescriptionChange={onDescriptionChange(i)}
                            positiveResponse={a.response.description}
                            onPositiveResponseChange={onPositiveResponseChange(i)}
                            reinforceBefore={a.response.reinforceBefore}
                            onReinforceBeforeChange={onReinforceBeforeChange(i)}
                            replacement={a.response.replacement}
                            onReplacementChange={onReplacementChange(i)}
                            reinforceAfter={a.response.reinforceAfter}
                            onReinforceAfterChange={onReinforceAfterChange(i)}
                        />
                    </div>
                )
            )}
        </div>
    )
}

function MyBehavior(props){
    const { behavior, onBehaviorChange } = props;
    return (
        <div className="form-group">
            <div className="styled-select clearfix">
                <select className="nice-select wide required" 
                        onChange={onBehaviorChange} 
                        value={behavior}>
                    {behaviorDescriptions.map(x =>
                        <option value={x}>{x}</option>
                    )}
                </select>
            </div>
        </div>
    )
}


export default MyNote;
