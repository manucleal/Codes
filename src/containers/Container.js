// System
import React, { useState } from 'react';
import { BrowserRouter, withRouter } from "react-router-dom";

// Components
import Sidebar from '../components/sidebar/Sidebar';

// Routes
import Routes from '../routes/Routes';

// Services
import MockBackend from '../MockBackend';

// Styles
import '../styles/App.css';

const Container = () => {

    // Get list Clients
    const [clients] = useState(MockBackend.listClients());

    // Get list Venues
    const [venues] = useState(MockBackend.listVenues());

    return (
        <BrowserRouter>
            <Sidebar />
            <Routes
                clients={clients}
                venues={venues}
            />
        </BrowserRouter>
    );
}

export default withRouter(Container);

