import React, { useState, useEffect } from 'react';
import MockBackend from '../MockBackend';
import { Link } from "react-router-dom";

const Client = (props) => {
    
    const [ inputSearch, setInputSearch ]  = useState('');
    const [ searchResults, setSearchResults ]  = useState([]);

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
        <main>
            <small><em>Clients List</em></small>

            <div className="row form-group search-align">
                <input type="search" name="search" className="col-md-11" value={ inputSearch } onChange={ handleChange } placeholder="Search by age" />
            </div>

            <Link to="/CreateClient">
                <button type="button">
                    Add Client +
                </button>
            </Link>
            <div id="content">
                <table className="table">
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
                                                <button className="button muted-button"> 
                                                    Update
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

