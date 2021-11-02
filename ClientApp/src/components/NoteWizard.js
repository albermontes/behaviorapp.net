import React, { useState } from 'react';
import './NoteWizard.css';

function firstStep() {

    return (
        <div>
            <div>
                <select name="location">
                    <option value="">Location</option>
                    <option value="">At home</option>
                    <option value="">At school</option>
                    <option value="">In the park</option>
                </select>
            </div>
            <br/>
            <div>
                <div>Caregiver</div>
                <div>
                    <input type="checkbox" />
                    Mother
                </div>
                <div>
                    <input type="checkbox" />
                    Father
                </div>
                <div>
                    <input type="checkbox" />
                    Grandmother
                </div>
            </div>
            <br />
            <div>
                <textarea type="text" placeholder="Description of what is this ..."/>
            </div>
        </div>
    );
}
const secondStep = () => {
    return (
        <div>
             <div>
                <div>
                    <select>
                        <option>Select the Schedule Activity</option>
                        <option>Not ready for the activity</option>
                        <option>Puzzle</option>
                        <option>Mazes</option>
                        <option>Flash Card Set</option>
                    </select>
                </div>
            </div>
            <div>
                <span>
                    <input type="radio" />
                    POSITIVE
                    <input type="radio" />
                    NEGATIVE
                </span>
            </div>
            <div>
                Response description<br />
                <textarea placeholder="Description of what is this..."></textarea>
            </div>
            <div>
                <div>
                    <select>
                        <option value="a">Behavior</option>
                        <option value="">lorem</option>
                        <option value="">lorem</option>
                        <option value="">lorem</option>
                    </select>
                </div>
            </div>
            <div>
                <div>
                    <select>
                        <option value="amet">Intervention</option>
                        <option value="">lorem</option>
                        <option value="">lorem</option>
                        <option value="">lorem</option>
                    </select>
                </div>
            </div>
            <div>
                Response description<br/>
                <textarea placeholder="Description of what is this..."></textarea>
            </div>
            <div>
                <div>
                    <select>
                        <option value="a">Reinforce (before)</option>
                        <option value="">lorem</option>
                        <option value="">lorem</option>
                        <option value="">lorem</option>
                    </select>
                </div>
            </div>
            <div>
                <div>
                    <select>
                        <option value="a">Behavior</option>
                        <option value="">lorem</option>
                        <option value="">lorem</option>
                        <option value="">lorem</option>
                    </select>
                </div>
            </div>
            <div>
                <div>
                    <select>
                        <option value="">Reinforce (after)</option>
                        <option value="">lorem</option>
                        <option value="">lorem</option>
                        <option value="">lorem</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
const thirdStep = () => {
    return (
        <div>
            <div>
                Health<br/>
                <textarea placeholder="Description of what is this???..."></textarea>
            </div>
            <div>
                Family feedback<br/>
                <div>
                    <input type="checkbox" value="Google Search Engine"/>
                    Lorem phrases
                </div>
                <div>
                    <input type="checkbox" value="A friend of mine"/>
                    Lorem phrases
                </div>
            </div>
            <div>
                Competency of caregiver<br />
                <div>
                    <input type="checkbox" value="Google Search Engine" />
                    Lorem phrases
                </div>
                <div>
                    <input type="checkbox" value="A friend of mine" />
                    Lorem phrases
                </div>
            </div>
        </div>
    );
}

export function NoteWizard() {

    const [steps, setSteps] = useState([
        { key: 'firstStep', label: 'Introduction', isDone: true, component: firstStep },
        { key: 'secondStep', label: 'Progress', isDone: false, component: secondStep },
        { key: 'thirdStep', label: 'Conclusion', isDone: false, component: thirdStep }
    ]);

    const [activeStep, setActiveStep] = useState(steps[0]);

    const handleNext = () => {
        if (steps[steps.length - 1].key === activeStep.key) {
            alert('You have completed all steps.');
            return;
        }

        const index = steps.findIndex(x => x.key === activeStep.key);
        setSteps(prevStep => prevStep.map(x => {
            if (x.key === activeStep.key) x.isDone = true;
            return x;
        }))
        setActiveStep(steps[index + 1]);
    }

    const handleBack = () => {
        const index = steps.findIndex(x => x.key === activeStep.key);
        if (index === 0) return;

        setSteps(prevStep => prevStep.map(x => {
            if (x.key === activeStep.key) x.isDone = false;
            return x;
        }))
        setActiveStep(steps[index - 1]);
    }

    return (
        <div>
            <div>
                <h4>{steps.findIndex(x => x.key === activeStep.key) + 1}/{steps.length}</h4>
                <h3>{activeStep.label}</h3>
                <br/>
                <div className="step-component">
                    {activeStep.component()}
                </div>
                <br/>
                <div className="btn-component">
                    <input type="button" value="Back"
                        hidden={steps[0].key === activeStep.key}
                        onClick={handleBack} />
                    <input type="button"
                        value={steps[steps.length - 1].key !== activeStep.key ? 'Next' : 'Finish'}
                        hidden={steps[steps.length - 1].key === activeStep.key}
                        onClick={handleNext} />
                </div>
            </div>
        </div>
    );
}

export default NoteWizard;