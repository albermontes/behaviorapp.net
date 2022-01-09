import React from "react";
import { reinforceDescriptions, replacementDescriptions } from "./data";

export default function MyPositiveResponse(props){
    const { positiveResponse, onPositiveResponseChange,
            reinforceBefore, onReinforceBeforeChange,
            replacement, onReplacementChange,
            reinforceAfter, onReinforceAfterChange
    } = props; 
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
                    <select className="nice-select wide required"
                            value={reinforceBefore}
                            onChange={onReinforceBeforeChange} >
                        {reinforceDescriptions.map(x =>
                             <option value={x}
                                    hidden={x == ''}>
                                {x == '' ? 'Select a Reinforce before Replacement' : x}
                            </option>  
                        )}
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label>What replacement did you apply?</label>
                <div class="styled-select clearfix">
                    <select className="nice-select wide required"
                            value={replacement}
                            onChange={onReplacementChange} >
                        {replacementDescriptions.map(x =>
                             <option value={x}
                                    hidden={x == ''}>
                                {x == '' ? 'Select a Replacement' : x}
                            </option>  
                        )}
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label>What reinforce did you applied after replacement?</label>
                <div class="styled-select clearfix">
                    <select className="nice-select wide required"
                            value={reinforceAfter}
                            onChange={onReinforceAfterChange} >
                        {reinforceDescriptions.map(x =>
                             <option value={x}
                                    hidden={x == ''}>
                                {x == '' ? 'Select a Reinforce after Replacement' : x}
                            </option>  
                        )}
                    </select>
                </div>
            </div>
        </div>
    )
}