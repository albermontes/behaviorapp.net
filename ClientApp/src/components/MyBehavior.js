import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { behaviorDescriptions } from './data';

export default function MyBehavior(props){
    const { behavior, onBehaviorChange,
            negativeResponse, onNegativeResponseChange } = props;
    
    const [behaviorOption, setOption] = useState(behavior);
    const setBehaviorOption = x => {
        setOption(x);
        onBehaviorChange(x);
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
                <label>What behavior the client shows?</label>
                <div className="styled-select clearfix">
                    <CreatableSelect
                        styles={customOptionStyle}
                        defaultValue={behaviorOption}
                        onChange={setBehaviorOption}
                        isMulti
                        placeholder="Select the Behaviors shown"
                        options={behaviorDescriptions}
                    />
                    {/*<select className="nice-select wide required" 
                            onChange={onBehaviorChange} 
                            value={behavior}>
                        {behaviorDescriptions.map(x =>
                            <option value={x}
                                    hidden={x == ''}>
                                {x == '' ? 'Select a Behavior' : x}
                            </option>  
                        )}
                    </select>*/}
                </div>
            </div>
            <div className="form-group">
                <label>Describe what happened?</label>
                <textarea className="form-control"
                        placeholder="Description of what is this..."
                        value={negativeResponse}
                        onChange={onNegativeResponseChange}/>
            </div>
        </div>
    )
}