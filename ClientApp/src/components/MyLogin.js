import React from 'react';
import logo from '../img/logo.png';
import { useHistory, useParams } from 'react-router-dom';

export default function MyLogin(){

    const history = useHistory();
    const onLogin = e => {
        e.preventDefault();
        history.push('/clients');
    }

    return (
        <div className="gnx-bck-dark">
            <div className="ba-login">
                <h1 className="h3 mb-4">
                    <img className="mb-3" src={logo} alt="" width="49" height="35"/>
                    <br/>
                    BehaviorApp
                </h1>
                <label for="inputEmail" class="sr-only">Email</label>
                <input type="email" id="inputEmail" class="form-control mb-3" placeholder="Email address" required="" autofocus=""/>
                <label for="inputPassword" class="sr-only">Password</label>
                <input type="password" id="inputPassword" class="form-control" placeholder="Password" required=""/>
                <div class="checkbox my-3">
                    <label class="text-muted">
                        <input type="checkbox" value="remember-me"/> 
                        Remember me
                    </label>
                </div>
                <button class="btn btn-md btn-primary btn-block" type="submit" onClick={onLogin}>LOG IN</button>
                <p class="mt-5 mb-3 text-muted text-center">BehaviorApp.net © {new Date().getFullYear()}</p>
            </div>
        </div>
    )
}