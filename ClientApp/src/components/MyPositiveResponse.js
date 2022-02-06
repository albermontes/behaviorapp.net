import React, { useState } from "react";
import CreatableSelect from 'react-select/creatable';  
import {  OK_TAG, BAD_TAG, reinforceDescriptions, replacementDescriptions } from "./data";

export default function MyPositiveResponse(props){
    const { positiveResponse, onPositiveResponseChange,
            reinforceBefore, onReinforceBeforeChange,
            replacement, onReplacementChange,
            reinforceAfter, onReinforceAfterChange,
            reinforceResponse, onReinforceResponseChange,
            onReinforceDescriptionChange
    } = props; 

    const [reinforceBeforeOption, setRBOption] = useState(reinforceBefore);
    const setReinforceBeforeOption = x => {
        setRBOption(x);
        onReinforceBeforeChange(x);
    }
    const [reinforceAfterOption, setRAOption] = useState(reinforceAfter);
    const setReinforceAfterOption = x => {
        setRAOption(x);
        onReinforceAfterChange(x);
    }
    const [replacementOption, setROption] = useState(replacement);
    const setReplacementOption = x => {
        setROption(x);
        onReplacementChange(x);
    }

    const customOptionStyle = {
        option: (provided, state) => ({
            ...provided,
            color : 'black'
        })
    }

    return (
        <div>
            <div className="form-group">
                <label>Describe the response</label>
                <textarea className="form-control"
                        placeholder="Description of what is this..."
                        value={positiveResponse}
                        onChange={onPositiveResponseChange}/>
            </div>
            <div class="form-group mt-5">
                <label>What reinforce did you applied before replacement?</label>
                <div class="styled-select clearfix">
                    <CreatableSelect
                        styles={customOptionStyle}
                        defaultValue={reinforceBeforeOption}
                        onChange={setReinforceBeforeOption}
                        isMulti
                        placeholder="Select the Reinforces used"
                        options={reinforceDescriptions}
                    />
                    {/*
                    <select className="nice-select wide required"
                            value={reinforceBefore}
                            onChange={onReinforceBeforeChange} >
                        {reinforceDescriptions.map(x =>
                             <option value={x}
                                    hidden={x == ''}>
                                {x == '' ? 'Select a Reinforce before Replacement' : x}
                            </option>  
                        )}
                        </select>*/}
                </div>
            </div>
            <div class="form-group">
                <label>What replacement did you apply?</label>
                <div class="styled-select clearfix">
                    <CreatableSelect
                        styles={customOptionStyle}
                        defaultValue={replacementOption}
                        onChange={setReplacementOption}
                        isMulti
                        placeholder="Select the Replacements used"
                        options={replacementDescriptions}
                    />
                    {/*
                    <select className="nice-select wide required"
                            value={replacement}
                            onChange={onReplacementChange} >
                        {replacementDescriptions.map(x =>
                             <option value={x}
                                    hidden={x == ''}>
                                {x == '' ? 'Select a Replacement' : x}
                            </option>  
                        )}
                    </select>*/}
                </div>
            </div>
            <div class="form-group">
                <label>What reinforce did you applied after replacement?</label>
                <div class="styled-select clearfix">
                    <CreatableSelect
                        styles={customOptionStyle}
                        defaultValue={reinforceAfterOption}
                        onChange={setReinforceAfterOption}
                        isMulti
                        placeholder="Select the Reinforces used"
                        options={reinforceDescriptions}
                    />
                    {/*
                    <select className="nice-select wide required"
                            value={reinforceAfter}
                            onChange={onReinforceAfterChange} >
                        {reinforceDescriptions.map(x =>
                             <option value={x}
                                    hidden={x == ''}>
                                {x == '' ? 'Select a Reinforce after Replacement' : x}
                            </option>  
                        )}
                    </select>*/}
                </div>
            </div>
            <div class="form-group">
                <label>How was the response to the reinforces applied?</label>
                <div className="form-group d-flex"   
                        onChange={onReinforceResponseChange}>
                    <label className="container_radio version_2">
                        {OK_TAG}
                        <input className="required valid"
                                type="radio" 
                                value={OK_TAG} 
                                checked={reinforceResponse.label == OK_TAG}/>
                        <span className="checkmark"></span>
                    </label>
                    <label className="container_radio version_2 ml-5">
                        {BAD_TAG}
                        <input className="required valid"
                                type="radio" 
                                value={BAD_TAG} 
                                checked={reinforceResponse.label == BAD_TAG}/>
                        <span className="checkmark"></span>
                    </label>
                </div>
                <label>Describe the response</label>
                <textarea className="form-control"
                        placeholder="Description of what is this..."
                        value={reinforceResponse.description}
                        onChange={onReinforceDescriptionChange}/>
            </div>
        </div>
    )
}