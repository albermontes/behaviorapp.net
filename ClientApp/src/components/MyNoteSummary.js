import React, { useState, useEffect } from 'react';
import deleteIcon from '../img/ba-icon-delete.svg';

export default function MyNoteSummary(props){
    const { jsonNote, onClearNote } = props;
    const [summary, setSummary] = useState('');
    const [ note, setNote ] = useState(JSON.parse(jsonNote));
    const [ notes, setNotes ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        setNote(JSON.parse(jsonNote));
        fetch('api/notesummary?note=' + jsonNote)
            .then(response => response.json())
            .then(responseWrapper => {
                setSummary(responseWrapper.summary);
            })
    }, [jsonNote])

    useEffect(() => {
        getNotes().then(() => {
            setLoading(false)
        });
    }, [])

 
    const onRemove = i => e => {
        if(e){
            setLoading(true);
            fetch('api/notes/' + i,{
                method: 'DELETE',
                headers:{ 'Content-Type':'application/json' },
            }).then(() => {
                getNotes().then(() => {
                    setLoading(false)
                });
            }).catch(e => {
                console.log('error removing note ' + i + ' -> ' + JSON.stringify(e));
                alert('error removing note ' + i + ' -> ' + JSON.stringify(e));
            })
        }
    }

    const getNotes = async () => {
        const response = await fetch('api/clients/' + note.clientId + '/notes');
        const notesResponse = await response.json();
        setNotes(await Promise.all(
            notesResponse.map(
                async x => { return { 
                    ...x,
                    summary: await getUnformattedSummary(x)
                }
            })
        ));
    }
 
    const saveNote = e => {
        if(e){
            console.log('posting -> ' + jsonNote);
            setLoading(true);
            fetch('api/notes',{
                method: 'POST',
                headers:{ 'Content-Type':'application/json' },
                body: JSON.stringify({
                    date: note.date,
                    detailInfo: note.detailInfo,
                    activities: note.activities,
                    clientId: parseInt(note.clientId)
                })
            })
                .then(r => r.json())
                    .then(n => {
                        alert('Note was successfully inserted');
                        // do something after saveing note successfully
                        // TODO: clear current note
                        getNotes().then(() => {
                            onClearNote();
                            setLoading(false)
                        });
                    })
                    .catch(error => {
                        console.log('error saving note -> ' + JSON.stringify(error));
                        alert('error saving note -> ' + JSON.stringify(error));
                    })
                .catch(error => {
                    console.log('error saving note -> ' + JSON.stringify(error));
                    alert('error saving note -> ' + JSON.stringify(error));
                })
        }
    }

   const getUnformattedSummary = async (n) => {
        
        const response = await fetch('api/notesummary?note=' + JSON.stringify(n));
        const summaryResponse = await response.json();
        
        let summary2 = summaryResponse.summary;
        
        summary2 = summary2.replaceAll('</mark>', '');
        summary2 = summary2.replaceAll('<mark class=\"gnx-bck-introduction\">', '');
        summary2 = summary2.replaceAll('<mark class=\"gnx-bck-conclusion\">', '');
        summary2 = summary2.replaceAll('<mark class=\"gnx-bck-activities\">', '');
        summary2 = summary2.replaceAll('<mark class=\"gnx-bck-transitions\">', '');
        summary2 = summary2.replaceAll('<mark class=\"gnx-bck-replacements\">', '');
        summary2 = summary2.replaceAll('<mark class=\"gnx-bck-behaviors\">', '');
        summary2 = summary2.replaceAll('<mark class=\"gnx-bck-reinforcements\">', '');
        summary2 = summary2.replaceAll('<mark class=\"gnx-bck-interventions\">', '');
        
        return summary2;
    }

    return  (   
                <div>
                     <div className="d-flex py-2 gnx-bck-lightgray gnx-bb-dark">
                        <div className="px-3">
                            {new Date(note.date + 'T00:00').toLocaleDateString("en-US", {
                                    month: 'short', year: 'numeric', day: 'numeric'
                                        }).toUpperCase()
                            }
                        </div>
                    </div>
                    <div className="gnx-color-lightgray" 
                        dangerouslySetInnerHTML={{ __html: summary }}>
                    </div>
                    {/* <div className="text-right">
                        <button className="ba-button ba-button-transparent"
                                onClick={saveNote}>
                            SAVE NOTE
                        </button>
                    </div> */}
                    {/* loading 
                        ? <Oval color="#00BFFF" height={80} width={80}/>
                        :  */notes.map(x => 
                        <div>
                            <div className="d-flex py-2 gnx-bck-lightgray gnx-bb-dark rounded">
                                <div className="px-3">
                                    {new Date(x.date).toLocaleDateString("en-US", {
                                            month: 'short', year: 'numeric', day: 'numeric'
                                                }).toUpperCase()
                                    }
                                </div>
                                <div style={{"width": "95%", "textAlign":"right", "position":"absolute"}}>
                                    <button className="ba-button ba-button ba-button-action"
                                            onClick={onRemove(x.id)}>
                                        <img src={deleteIcon} 
                                                alt="" 
                                                width="13"/>
                                    </button>
                                </div>  
                            </div>
                            <div className="ba-note gnx-color-lightgray p-3 d-flex">
                                {x.summary}
                            </div>   
                        </div>
                    )}
                    {/* <pre className="gnx-color-lightgray">
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