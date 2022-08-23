import React, { useState, useEffect } from 'react';
import '../css/site.css';
import logo from '../img/logo.png';
import left from '../img/ba-arrow-left.svg';
import right from '../img/ba-arrow-right.svg';
import MyNoteSummary from './MyNoteSummary.js';
import MyActivity from './MyActivity';
import { locations, caregivers, BAD_TAG } from './data';
import { useHistory, useParams } from 'react-router-dom';

export default function MyCurrentNote(props){

    const { 
        step, onPrevStep, onNextStep,
        note, onCloseNote 
    } = props;

    return ( 
        <div className="col-lg-5 pt-3 pb-5 content-right" id="start">
            <div id="wizard_container">
                <div className="px-2 py-2">
                    <a className="ba-arrow-r pointer" 
                        onClick={onCloseNote}>
                        <span className="pr-2">X CLOSE NOTE</span>
                    </a>
                </div>
                <div class="px-4 py-5" id="middle-wizard">
                    {note}
                </div>                       
            </div>
            <div id="bottom-wizard">
                <button className="backward"
                        onClick={onPrevStep} 
                        hidden={step == 1}>
                    PREV
                </button>
                <button className="forward"
                        onClick={onNextStep} 
                        hidden={step == 3}>
                    NEXT
                </button>
            </div> 
        </div>
    )
}
