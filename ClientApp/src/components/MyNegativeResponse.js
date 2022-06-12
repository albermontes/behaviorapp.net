import React from "react";
import MyIntervention from "./MyIntervention";
import deleteIcon from '../img/ba-icon-delete.svg';

export default function MyNegativeResponse(props){
    const { actIndex,
            interventions, 
            onRemove,
            onResponseChange, 
            onDescriptionChange, 
            onBehaviorChange, 
            onPositiveResponseChange,
            onReinforceBeforeChange,
            onReplacementChange,
            onReinforceAfterChange,
            onReinforceResponseChange,
            onReinforceDescriptionChange
    } = props;
    
    return (
        <div>
            { interventions.map((a, i) => (
                    <div>
                        <div className="d-flex justify-content-between">
                            <div>
                                <h4>{i+1}. Behavior</h4>
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
                        <div class="ml-3">
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
                                reinforceResponse={a.response.reinforceResponse}
                                onReinforceResponseChange={onReinforceResponseChange(i)}
                                onReinforceDescriptionChange={onReinforceDescriptionChange(i)}
                            />
                        </div>    
                    </div>
                )
            )}
        </div>
    )
}