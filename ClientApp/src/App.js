import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import MyLogin from './components/MyLogin';
import MyClients from './components/MyClients';
import MyNoteEditor from './components/MyNoteEditor';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
            <Route exact path='/' component={MyLogin} />
            <Route exact path='/clients' component={MyClients} />
            <Route path='/notes/:id' component={MyNoteEditor} />
            {/* <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} /> */}
      </Layout>
    );
  }
}
