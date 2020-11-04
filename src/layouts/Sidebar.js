import React, { Fragment, useState } from 'react';
import { BrowserRouter, Link, withRouter } from "react-router-dom";
import Routes from '../routes/Routes';
import MockBackend from '../MockBackend';
import '../styles/App.css';

const Sidebar = () => {

    // Get list Clients
    const [clients] = useState(MockBackend.listClients());

    // Get list Venues
    const [venues] = useState(MockBackend.listVenues());

    return (
        <BrowserRouter>
            <div className="wrapper d-flex align-items-stretch">
                <nav id="my-sidebar">
                    <div className="p-4 pt-5">
                        <img className="img logo mb-5" src="./logo.png" alt="logo" />
                        <ul className="list-unstyled components mb-5">
                            <li className="active">
                                <a href="#">Home</a>
                            </li>
                            <li>
                                <Link to="/client"> Clients </Link>
                            </li>
                            <li>
                                <Link to="/venue"> Venues </Link>
                            </li>
                            <li>
                                <a href="#">Contact</a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="footer">
                    <p>HOLAAA</p>
                </div>
            </div>
            <Routes
                clients={clients}
                venues={venues}
            />
        </BrowserRouter>
    );
}

export default withRouter(Sidebar);

