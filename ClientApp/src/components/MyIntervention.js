import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import MyBehavior from './MyBehavior';
import MyPositiveResponse from './MyPositiveResponse';
import { OK_TAG, BAD_TAG, interventionDescriptions } from './data';


export default function MyIntervention(props){
    const { index, actIndex, description, onDescriptionChange,
            behavior, onBehaviorChange,
            response, onResponseChange,
            positiveResponse, onPositiveResponseChange,
            reinforceBefore, onReinforceBeforeChange,
            replacement, onReplacementChange,
            reinforceAfter, onReinforceAfterChange,
            reinforceResponse, onReinforceResponseChange,
            onReinforceDescriptionChange
    } = props;

    const customOptionStyle = {
        option: (provided, state) => ({
            ...provided,
            color : 'black'
        })
    }

    const [interventionOption, setOption] = useState(description);

    const setInterventionOption = x => {
        setOption(x);
        onDescriptionChange(x);
    }
    
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
                reinforceResponse={reinforceResponse}
                onReinforceDescriptionChange={onReinforceDescriptionChange}
                onReinforceResponseChange={onReinforceResponseChange}
            />
        : ''
        const responseSelectionElement = description == null
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
                <label>What intervention did you apply?</label>
                <div className="styled-select clearfix">
                    <CreatableSelect
                        styles={customOptionStyle}
                        defaultValue={interventionOption}
                        onChange={setInterventionOption}
                        isMulti
                        placeholder="Select the Interventions used"
                        options={interventionDescriptions}
                    />
                </div>
            </div>
            {responseSelectionElement}
            {positiveElement}
        </div>
    )
}