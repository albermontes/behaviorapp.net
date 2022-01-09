import React from 'react';
import MyBehavior from './MyBehavior';
import MyPositiveResponse from './MyPositiveResponse';
import { OK_TAG, BAD_TAG, interventionDescriptions } from './data';

export default function MyIntervention(props){
    const { index, actIndex, description, onDescriptionChange,
            behavior, onBehaviorChange,
            response, onResponseChange,
            positiveResponse, onPositiveResponseChange,
            negativeResponse, onNegativeResponseChange,
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
                negativeResponse={negativeResponse}
                onNegativeResponseChange={onNegativeResponseChange}
            />
             <div className="form-group">
                <label>What intervention did you apply?</label>
                <div className="styled-select clearfix">
                    {/*<Select
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        options={interventionsTest}/>
                    */}
                    <select 
                            className="nice-select wide required" 
                            onChange={onDescriptionChange} 
                            value={description}>
                        {interventionDescriptions.map(x =>
                             <option value={x}
                                    hidden={x == ''}>
                                {x == '' ? 'Select an Intervention' : x}
                            </option>  
                        )}
                    </select>
                </div>
            </div>
            {responseSelectionElement}
            {positiveElement}
        </div>
    )
}