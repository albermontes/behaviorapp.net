import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import MyLogin from './components/MyLogin';
import MyClients from './components/MyClients';
import MyNoteEditor from './components/MyNoteEditor';
import { useAuth0 } from '@auth0/auth0-react';

const App = () => {
	const { isLoading, error } = useAuth0();
	if(error){
		return <div>Oops... {error.message}</div>
	}
	if(isLoading){
		return <div>Loading...</div>
	}		

	return (
		<Layout>
			<Route exact path='/' component={MyLogin} />
			<Route exact path='/clients' component={MyClients} />
			<Route path='/notes/:id' component={MyNoteEditor} />
			{/* <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} /> */}
		</Layout>
	);
}

export default App;
