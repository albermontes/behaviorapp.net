import React from "react";
import { useAuth0 } from '@auth0/auth0-react';
import MyLogoutButton from './MyLogoutButton';
import MyLoginButton from './MyLoginButton';

const MyProfile = () => {
    const { user } = useAuth0();

    if(!user){
		return <MyLoginButton/>
	}

    return (
        <h3 className="mb-4">
            <img
                src={user.picture}
                alt="Profile"
                className="nav-user-profile rounded-circle"
                width="24"
            />
            &nbsp;&nbsp;{user.name}&nbsp;&nbsp;
            <MyLogoutButton/>
        </h3>
        
    )
} 

export default MyProfile;