import React, { useState, useEffect } from 'react';
import VenueForm from './VenueForm';

const Venue = (props) => {
    
    const [ inputSearch, setInputSearch ]  = useState('');
    const [ searchResults, setSearchResults ]  = useState([]);

    const addVenue = (venue) => {
        props.addVenueParent(venue);
        setSearchResults([ ...searchResults, venue ]);
    }

    const handleChange = (event) => {
        setInputSearch(event.target.value);
    }

    //Input search
    useEffect(() => {

        const results = props.venues.filter(venue => 
            venue.name.toLowerCase().includes(inputSearch)
        ).slice(0, 10)
        setSearchResults(results);

    }, [ inputSearch ]);


    return (
        <main>
        <small><em>Venues List</em></small>
        <div className="row form-group">
            <input type="search" className="col-md-2 ml-3" name="search" value={ inputSearch } onChange={ handleChange } placeholder="Search" />
        </div>
        <div id="content">
            <div className="venueTable">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>  
                        {
                            searchResults.map( 
                                venue => (
                                    <tr key={ venue.id }>
                                        <td>{ venue.id }</td>
                                        <td>{ venue.name }</td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
            </div>
            <div className="venueForm">
                <VenueForm addVenue={ addVenue } /> 
            </div>

        </div>
        </main>
    );
}

export default Venue;