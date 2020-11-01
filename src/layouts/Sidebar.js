import React, { useState } from 'react';
import { BrowserRouter, Link } from "react-router-dom";
import Routes from '../routes/Routes';
import MockBackend from '../MockBackend';
import '../styles/App.css';

const Sidebar = () => {

    const [ clients ] =  useState(MockBackend.listClients());
    const [ venues ] =  useState(MockBackend.listVenues());

    const addClient = (client) => {
        let created = MockBackend.addClient(client);
        MockBackend.addFavoriteVenueToClient(created.id, client.newVenue);        
    }

    const addVenueParent = (venue) => {
        MockBackend.addVenue(venue);   
    }

    return (
        <BrowserRouter>
            <aside id="mySidebar" className="sidebar">
                <div className="sidebar-header">
                    <img className="App-logo" src="./logo.png" alt="logo" />
                </div>
                <div className="row items">
                    <ul>
                        <li><Link to="/client"> Clients </Link></li>
                        <li><Link to="/createClient"> Create Client </Link></li>
                        <li><Link to="/venue"> Venues </Link></li>
                    </ul>
                </div>
            </aside>
            
            <Routes 
                clients={ clients }
                addClient={ addClient }
                venues={ venues }
                addVenueParent={ addVenueParent }
            />

        </BrowserRouter>
    );
}

export default Sidebar;

    //const [colapse, openSidebar] = useState(true);

    // function openClose() {
    //     openSidebar(!colapse);
    //     if (colapse) {
    //         document.getElementById("mySidebar").style.width = "200px";
    //     }
    //     else {
    //         document.getElementById("mySidebar").style.width = "170px";
    //     }
    // }

