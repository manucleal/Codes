import React, { useState } from 'react';
import { BrowserRouter, Link, withRouter } from "react-router-dom";
import Routes from '../routes/Routes';
import MockBackend from '../MockBackend';
import '../styles/App.css';

const Sidebar = () => {

    // Get list Clients
    const [ clients ] =  useState(MockBackend.listClients());

    // Get list Venues
    const [ venues ] =  useState(MockBackend.listVenues());

    return (
        <BrowserRouter>
            <aside id="mySidebar" className="sidebar">
                <div className="sidebar-header">
                    <img className="App-logo" src="./logo.png" alt="logo" />
                </div>
                <div className="row items">
                    <ul>
                        <li><Link to="/client"> Clients </Link></li>
                        <li><Link to="/venue"> Venues </Link></li>
                    </ul>
                </div>
            </aside>
            <Routes 
                clients={ clients }
                venues={ venues }
            />

        </BrowserRouter>
    );
}

export default withRouter(Sidebar);

