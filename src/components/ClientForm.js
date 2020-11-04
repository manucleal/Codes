// System
import React, { useState } from 'react';
import { useLocation, Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import Select from 'react-select';

// Services
import MockBackend from '../MockBackend';
import { alertService } from '../services';

const ClientForm = (props) => {
    
    let location = useLocation();
    const isAddMode = !location?.client;
    const currentClient = MockBackend.getClient(location?.client);
    const originalDataClient = { id: currentClient?.id, favVenue: currentClient?.favoriteVenues };

    // Selected Options select
    const [ selectedOption, setSelectedOption ] = useState(loadValuesMultiSelect());

    // Select Options 
    // const allOptionsSelect = (isAddMode) ? formatOptions(props.venues) : loadValuesMultiSelect();
    let allOptionsSelect = []; 

    if(isAddMode) {
        allOptionsSelect = formatOptions(props.venues);
    }
    else if(!isAddMode && currentClient?.favoriteVenues.length > 0){
        allOptionsSelect = loadValuesMultiSelect();
    }
    else {
        allOptionsSelect = formatOptions(props.venues);
    }

    
    // Form
    const { register, errors, handleSubmit, reset } = useForm({
        defaultValues: currentClient
    });
    
    const onSubmit = (data) => {
        (isAddMode) ? addClient(data) : updateClient(selectedOption, originalDataClient);
    }

    // Add new client
    const addClient = async (client) => {
        try {
            const newVenues = (selectedOption) ? selectedOption : [];
            const response = await MockBackend.addClient(client);
            if(response){
                for(const venue of newVenues){
                    MockBackend.addFavoriteVenueToClient(response.id, venue.value);
                }
            }
            alertService.success('Client added', { keepAfterRouteChange: true });
            setTimeout(function(){ window.history.back(); }, 3000);
            cleanForm();
        } 
        catch (error) {
            alertService.error(error, { keepAfterRouteChange: true });
        }
    }
    
    // Only Venue
    const updateClient = async (selectedOption, originalDataClient) => {
        try {

            for(const favVenue of originalDataClient?.favVenue){
                let finded = false;
                if(selectedOption !== null){
                    for(const newFavVenue of selectedOption){
                        finded = (favVenue === newFavVenue.value) ? true : false;
                    }
                }
                if(!finded) {
                    await MockBackend.removeFavoriteVenueFromClient(originalDataClient.id, favVenue);
                }
            }

            alertService.success('Client venue updated', { keepAfterRouteChange: true });
            setTimeout(function(){ window.history.back(); }, 3000);
        } 
        catch (error) {
            alertService.error(error, { keepAfterRouteChange: true });
        }
    }

    // onChange multi select
    const handleChange = (event)  => {
        setSelectedOption(event);
    }    

    const cleanForm = () => {
        reset();
        setSelectedOption([]);
    }

    function formatOptions (venues) {
        return venues.map((venue) => {
            return {
                value: venue.id,
                label: venue.name
            }
        });
    }

    function loadValuesMultiSelect() {
        let selectedOptions = [];
        if(currentClient?.favoriteVenues.length > 0){          
            for(const venueId of currentClient.favoriteVenues){
                selectedOptions = [ ...selectedOptions, formatOptions([MockBackend.getVenue(venueId)])[0] ];
            }
        }

        return selectedOptions;
    }

    return (
        <main>
            <small><em>{ isAddMode ? 'Create Client' : 'Update Client' } </em></small>
            <div id="content">
                <form className="form-groups" onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="col-md-4 col-form">
                            <label>Name</label>
                            <input type="text" className="form-control" name="name" 
                            disabled={ !isAddMode }
                            ref={
                                register({
                                    required: { value: true, message: 'Name is required' }
                                })
                            } 
                            />
                            <span className="text-danger text-small d-block mb-2">
                                {errors?.name?.message}
                            </span>
                        </div>
                        <div className="col-md-4 col-form">
                            <label>Email</label>
                            <input type="email" className="form-control" name="email"
                            disabled={ !isAddMode }
                            ref={
                                register({
                                    required: { value: true, message: 'Email is required' }
                                })
                            } />
                            <span className="text-danger text-small d-block mb-2">
                                {errors?.email?.message}
                            </span>
                        </div>
                        <div className="col-md-4 col-form">
                            <label>Favorite Venues</label>
                            <Select 
                                placeholder="Choose One"
                                value={ selectedOption }
                                options={ allOptionsSelect }
                                isMulti={ true }
                                onChange={ handleChange }
                            />
                        </div>
                    </div>

                    <div className="row ">
                        <div className="col-md-4 col-form">
                            <label>First Name</label>
                            <input type="text" className="form-control" name="firstName" 
                            disabled={ !isAddMode } 
                            ref={
                                register({ value: true })
                            } 
                            />
                            <span className="text-danger text-small d-block mb-2">
                                {errors?.firstName?.message}
                            </span>
                        </div>
                        <div className="col-md-4 col-form">
                            <label>Last Name</label>
                            <input type="text" className="form-control" name="lastName"
                            disabled={ !isAddMode } 
                            ref={
                                register({ value: true })
                            }                            
                            />
                            <span className="text-danger text-small d-block mb-2">
                                {errors?.lastName?.message}
                            </span>
                        </div>
                        <div className="col-md-2 col-form">
                            <label>Age</label>
                            <input type="number" className="form-control" name="age" 
                            disabled={ !isAddMode } 
                            ref={
                                register({ value: true })
                            }                            
                            />
                            <span className="text-danger text-small d-block mb-2">
                                {errors?.age?.message}
                            </span>
                        </div>
                    </div>
                    <div id="btnForm" className="col-md-12 btn-content text-right ">
                        <button type="submit" className="btn btn-primary btn-sm ">Save</button>
                        <Link to={isAddMode ? '.' : '/Client'} className="btn btn-outline btn-light mr-5 btn-sm">Cancel</Link>
                    </div>
                </form>
            </div>
        </main>
    )

}

export default ClientForm;