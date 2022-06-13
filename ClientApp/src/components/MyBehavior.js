import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { behaviorDefinitions } from './data';

export default function MyBehavior(props){

    const { behavior, onBehaviorChange } = props;

    const [behaviorOption, setOption] = useState(behavior);
    const setBehaviorOption = x => {
        setOption(x);
        onBehaviorChange(x);
    }
    const onBehaviorTypeChange = i => selectedItems => {
        behaviorOption[i].selectedItems = selectedItems;
        onBehaviorChange(behaviorOption);
    }

    const onBehaviorDescriptionChange = i => e => {
        behaviorOption[i].description = e.target.value;
        onBehaviorChange(behaviorOption);
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
                        options={behaviorDefinitions}
                    />
                </div>
            </div>
            {behaviorOption.map((option,i) => 
                <div className="pl-3 border-left ba-border-behaviors">
                     <div className="form-group">
                        <label>
                            <h4 class="ba-color-bx">{option.label}</h4>
                            Select the type 
                        </label>
                        <div className="styled-select clearfix">
                            <CreatableSelect
                                styles={customOptionStyle}
                                defaultValue={option.selectedItems}
                                onChange={onBehaviorTypeChange(i)}
                                isMulti
                                placeholder="Select the Behaviors shown"
                                options={option.types}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Describe the {option.label}</label>
                        <textarea className="form-control"
                                placeholder="Description of what is this..."
                                value={option.description}
                                onChange={onBehaviorDescriptionChange(i)}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}