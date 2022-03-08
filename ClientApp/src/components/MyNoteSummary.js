import React, { useState, useEffect } from 'react';

export default function MyNoteSummary(props){
    const { note } = props;
    const [summary, setSummary] = useState('');
    /* const [editableSummary, setEditableSummary] = useState(''); */

    useEffect(() => {
        fetch('notesummary?note=' + note)
            .then(response => response.json())
            .then(responseJson => {
                setSummary(responseJson.summary)
            })
    }, [note])

  /*   const copySummary = () => {
        var summary2 = summary;
        summary2 = summary2.replaceAll('</mark>', '');
        summary2 = summary2.replaceAll('<mark class=\"gnx-bck-introduction\">', '');
        summary2 = summary2.replaceAll('<mark class=\"gnx-bck-conclusion\">', '');
        summary2 = summary2.replaceAll('<mark class=\"gnx-bck-activities\">', '');
        summary2 = summary2.replaceAll('<mark class=\"gnx-bck-transitions\">', '');
        summary2 = summary2.replaceAll('<mark class=\"gnx-bck-replacements\">', '');
        summary2 = summary2.replaceAll('<mark class=\"gnx-bck-behaviors\">', '');
        summary2 = summary2.replaceAll('<mark class=\"gnx-bck-reinforcements\">', '');
        summary2 = summary2.replaceAll('<mark class=\"gnx-bck-interventions\">', '');
        setEditableSummary(summary2);
    }

    const setNewEditableSummary = e => {
        setEditableSummary(e.target.value);
    } */

    return  (   
                <div>
                    <div className="gnx-color-lightgray" 
                        dangerouslySetInnerHTML={{ __html: summary }}>
                    </div>
                   {/*  <pre className="gnx-color-lightgray">
                        {JSON.stringify(note, null, 2)}
                    </pre> */}
                    {/* <div class="text-right">
                        <button class="ba-button ba-button-transparent"
                                onClick={copySummary}>
                            COPY SUMMARY
                        </button>
                    </div>
                    <div className="gnx-color-lightgray" >
                        <textarea className="form-control"
                                    value={editableSummary}
                                    onChange={setNewEditableSummary}/>
                    </div> */}
                </div>
            )
}