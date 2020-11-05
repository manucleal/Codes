// System
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Components
import { Alert } from '../components/alert/Alert';
import Client from '../components/client/Client';
import ClientForm from '../components/client/ClientForm';
import Venue from '../components/venue/Venue';


const Routes = (props) => {
    return(
        <>
        <Alert />
        <Switch>
            <Route exact path="/" component={ () => <Client clients={ props.clients } /> }><Redirect to="/client" /></Route>
            <Route path='/client' component={ () => <Client clients={ props.clients } /> } />
            <Route exact path='/createClient' component={ () => <ClientForm venues={ props.venues } /> } />
            <Route exact path='/updateClient' component={ () => <ClientForm venues={ props.venues } /> } />
            <Route exact path='/venue' component={ () => <Venue venues={ props.venues } /> } />
        </Switch>
        </>
    )
}

export default Routes;