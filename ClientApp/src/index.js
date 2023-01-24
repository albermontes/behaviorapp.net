import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import MyNote from './components/MyNote';
import registerServiceWorker from './registerServiceWorker';
import { Auth0Provider } from '@auth0/auth0-react';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

ReactDOM.render(
	<Auth0Provider
			domain='jolly-mud-9657.us.auth0.com'
			clientId='EIuQZkGZvVUMUtyNCEzvb7Sj79VqF1SC'
			authorizationParams={{
				redirect_uri: window.location.origin + '/clients'
			}}>
		<BrowserRouter basename={baseUrl}>
			<App/>
		</BrowserRouter>
	</Auth0Provider>,
rootElement);

/* ReactDOM.render(
<MyNote/>,
rootElement
); */
// Uncomment the line above that imports the registerServiceWorker function
// and the line below to register the generated service worker.
// By default create-react-app includes a service worker to improve the
// performance of the application by caching static assets. This service
// worker can interfere with the Identity UI, so it is
// disabled by default when Identity is being used.
//
//registerServiceWorker();

