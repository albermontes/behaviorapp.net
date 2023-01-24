import React, { useState, useEffect } from 'react';
import logo from '../img/logo.png';
import deleteIcon from '../img/ba-icon-delete.svg';
import { useHistory } from 'react-router-dom';
import MyProfile from './MyProfile';

export default function MyClients(){

    const [clients, setClients] = useState([]);
    const [clientName, setClientName] = useState();
    const [comments, setComments] = useState();
    const [birthDate, setDate] = useState();
    const [verbal, setVerbal] = useState();
    const [ loading , setLoading] = useState(false);

    const clearData = () => {
        setClientName("");
        setDate("");
        setVerbal(false);
        setComments("");
    }

    useEffect(() => {
        getClients()
    }, [])

    const onClientNameChange = e => {
        setClientName(e.target.value);
    }

    const onCommentsChange = e => {
        setComments(e.target.value);
    }

    const onBirthDateChange = e => {
        setDate(e.target.value);
    }

    const onVerbalChange = e => {
        setVerbal(e.target.value == 'Verbal');
    }

    const onDeleteClient = i => e => {
        if(e){
            removeClient(i);
        }
    }

    const removeClient = i => {
        console.log('removing client ' + i);
        fetch('api/clients/' + i, {
            method: 'DELETE',
            headers:{ 'Content-Type':'application/json' }
        }) 
            .then(client => {
                getClients();
            })
            .catch(error => {
                console.log('error removing client ' + i + ' -> ' + JSON.stringify(error));
            })
    }

    const getClients = () => {
        setLoading(true);
        console.log('getting clients');
        fetch('api/clients',{
            method: 'GET',
            headers:{ 'Content-Type':'application/json' }
        })
            .then(r => r.json())
            .then(clients => {
                setClients(clients);
                clearData();
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                console.log('error getting clients -> ' + JSON.stringify(error));
                alert('error getting clients');
            })
    }

    const addClient = () => {

        if(isEmptyOrWhitespace(clientName) || 
                isEmptyOrWhitespace(birthDate) ||
                new Date(birthDate).getFullYear() >= new Date().getFullYear()){
            alert('You must provide a Name for the Client and the Birth Date must be maximum from last year.')
            return;
        }

        fetch('api/clients',{
            method: 'POST',
            headers:{ 'Content-Type':'application/json' },
            body: JSON.stringify({
                name: clientName,
                birthDate: birthDate,
                verbal: verbal,
                comments: comments
            })
        })
            .then(r => r.json())
            .then(client => {
               getClients();
            })
            .catch(error => {
                console.log('error creating new client -> ' + JSON.stringify(error));
                alert('error inserting new client');
            })
    }

    const history = useHistory();
    const onClientClick = i => e => {
        if(e){
            history.push('/notes/' + i);
        }
    }

    const isEmptyOrWhitespace = str => {
        return !str || !str.trim();
    }

    const getAge = (date) => {
        return Math.floor((new Date() - new Date(date).getTime()) / 3.15576e+10)
    }

    const pad = (num, size) => {
        num = num.toString();
        while (num.length < size) num = "0" + num;
        return num;
    }

    return (
        <div className="container-fluid full-height gnx-bck-dark">
            <div>
                <div className="d-flex justify-content-between p-3">
                    <div>
                        <a id="logo" href="/">
                            <img src={logo} alt="" width="49" height="35"/>
                        </a>
                    </div>
                    <MyProfile/>
                </div>
                <div className="d-flex justify-content-between gnx-bck-lightgray ba-add-client py-2">
                    <h3>ADD CLIENT</h3>
                    <div>
                        <input type="text" name="clientName" className="form-control required"
                            placeholder="Insert client name"  value={clientName} onChange={onClientNameChange}/>
                    </div>
                    <div>
                        <input className="form-control required" type="date" name="dateOfBirth"
                            placeholder="Select DOB" value={birthDate} onChange={onBirthDateChange}/>
                    </div>
                    <div className="d-flex radio_input">
                        <label className="container_radio">
                            Verbal
                            <input type="radio" name="gender" value="Verbal" className="required"
                                onChange={onVerbalChange}/>
                            <span className="checkmark"></span>
                        </label>
                        <label className="container_radio">
                            No verbal
                            <input type="radio" name="gender" value="No verbal" className="required"
                                checked="true"
                                onChange={onVerbalChange}/>
                            <span className="checkmark"></span>
                        </label>
                    </div>

                    <div>
                        <input type="text" name="additionalComments" className="form-control"
                            placeholder="Comments" value={comments} onChange={onCommentsChange}/>
                    </div>

                    <div className="pr-3">
                        <button className="ba-button ba-button-sm" type="submit" 
                                onClick={addClient}>
                            ADD
                        </button>
                    </div>
                </div>

                <div className="ba-client-table table-responsive">
                    <table className="table table-dark table-sm table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">NAME</th>
                                <th scope="col">AGE</th>
                                <th scope="col">VERBAL</th>
                                <th scope="col">COMMENTS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading 
                                ? 'Loading...'
                                : clients.map(x =>
                                <tr className="pointer">
                                    <th onClick={onClientClick(x.id)} scope="row">
                                        {pad(x.number, 4)}
                                    </th>
                                    <td onClick={onClientClick(x.id)}>
                                        <a className="text-capitalize">
                                            {x.name}
                                        </a>
                                    </td>
                                    <td onClick={onClientClick(x.id)}>{getAge(x.birthDate)}</td>
                                    <td onClick={onClientClick(x.id)}>{x.verbal ? 'YES' : 'NO'}</td>
                                    <td onClick={onClientClick(x.id)}>{x.comments}</td>
                                    <td className="text-right">
                                        {/*  <button className="ba-button ba-button-sm ba-button-action-2">
                                            EDIT
                                        </button> */}
                                        <button className="ba-button ba-button-icon ba-button-sm ba-button-action"
                                                onClick={onDeleteClient(x.id)}>
                                            <img src={deleteIcon} alt="" width="13" />
                                        </button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
