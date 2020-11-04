// System
import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Components
import { Alert } from '../components/Alert';
import Client from '../components/Client';
import ClientForm from '../components/ClientForm';
import Venue from '../components/Venue';


const Routes = (props) => {
    return(
        <>
        <Alert />
        <Switch>
            <Route path='/client' component={ () => <Client clients={ props.clients } /> } />
            <Route exact path='/createClient' component={ () => <ClientForm venues={ props.venues } /> } />
            <Route exact path='/updateClient' component={ () => <ClientForm venues={ props.venues } /> } />
            <Route exact path='/venue' component={ () => <Venue venues={ props.venues } /> } />
        </Switch>
        </>
    )
}

export default Routes;