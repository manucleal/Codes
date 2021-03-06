// System
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

// Components
import MockBackend from '../../MockBackend';

const Client = (props) => {
    
    const [ inputSearch, setInputSearch ]  = useState('');
    const [ searchResults, setSearchResults ]  = useState([]);
    
    // onChange Input search
    const handleChange = (event) => {
        setInputSearch(event.target.value);
    }

    // Input search
    useEffect(() => {
        const results = props.clients.filter(client => 
            String(client.age).includes(inputSearch)
        ).slice(0, 10)
        setSearchResults(results);
    }, [ inputSearch ]);

    return (
        <main >
            <small><em>Clients List</em></small>

            <div id="search" className="row form-group search-align">
                <input type="search" name="search" className="col-md-10 input-search size" value={ inputSearch } onChange={ handleChange } placeholder="Search by age" />
            </div>

            <Link to="/CreateClient">
                <button id="btn-form" type="button">
                    Add Client +
                </button>
            </Link>
            <div className="clientTable">
                <table className="table table-bordered mr-10 mt-5">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Fav Venues</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {   searchResults.length ? (
                            searchResults.map( 
                                client => (
                                    <tr key={ client.id }>
                                        <td>{ client.id }</td>
                                        <td>{ client.name }</td>
                                        <td>{ client.email }</td>
                                        <td>{ (typeof client.age !== "undefined" && client.age !== '') ? client.age : 'N/A' }</td>
                                        <td>{ (typeof client.firstName !== "undefined" && client.firstName !== '') ? client.firstName : 'N/A' } </td>
                                        <td>{ (typeof client.lastName !== "undefined" && client.lastName !== '') ? client.lastName : 'N/A' }</td>
                                        <td> 
                                            {   
                                                MockBackend.getClientFavoriteVenues(client.id).map(
                                                    vanue => ( 
                                                        <span key={ vanue.id }>{ '- ' + vanue.name }<br/></span> 
                                                    )
                                                )
                                            }
                                        </td>
                                        <td>
                                            <Link to={ { pathname: '/UpdateClient', client: client.id } }>                                                
                                                <button id="btn-form" className="button muted-button"> 
                                                    Update Fav Venues
                                                </button>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            )
                        ) : (
                            <tr><td>No clients</td></tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        </main>
    );
}

export default Client;

