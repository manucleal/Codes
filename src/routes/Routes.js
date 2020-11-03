import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Client from '../components/Client';
import ClientForm from '../components/ClientForm';
import Venue from '../components/Venue';

const Routes = (props) => {
    return(
        <Switch>
            <Route exact path='/Client' component={ () => <Client clients={ props.clients } /> } />
            <Route exact path='/CreateClient' component={ () => <ClientForm addClient={ props.addClient } venues={ props.venues } /> } />
            <Route exact path='/UpdateClient' component={ () => <ClientForm updateFavoriteVenueToClient={ props.updateFavoriteVenueToClient } venues={ props.venues } /> } />
            <Route exact path='/Venue' component={ () => <Venue venues={ props.venues } addVenueParent={ props.addVenueParent } /> } />
        </Switch>
    )
}

export default Routes;