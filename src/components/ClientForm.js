import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import MockBackend from '../MockBackend';
import { useLocation } from "react-router-dom";

const ClientForm = (props) => {
    let location = useLocation();
    const isAddMode = !location?.client;
    const currentClient = MockBackend.getClient(location?.client);
    const originalDataClient = { id: currentClient?.id, favVenue: currentClient?.favoriteVenues };
    const [ selectedOption, setSelectedOption ] = useState(loadValuesMultiSelect());
    const allOptionsSelect = (isAddMode) ? formatOptions(props.venues) : loadValuesMultiSelect ();
    const { register, errors, handleSubmit, reset } = useForm({
        defaultValues: currentClient
    });
    
    const onSubmit = (data) => {
        if(isAddMode){
            data.newVenue = selectedOption;
            props.addClient(data); 
        }
        else {
            props.updateFavoriteVenueToClient(selectedOption, originalDataClient);
        }
        cleanForm();
    }

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

    function loadValuesMultiSelect () {
        let selectedOptions = [];
        if(currentClient){            
            for(const venueId of currentClient.favoriteVenues){
                selectedOptions = [ ...selectedOptions, formatOptions([MockBackend.getVenue(venueId)])[0] ];
            }
        }
        return selectedOptions;
    }

    return (
        <main>
            <small><em>Create Client</em></small>
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
                            } />
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
                        <div className="col-md-2 col-form">
                            <label>Age</label>
                            <input type="number" className="form-control" name="age" 
                            disabled={ !isAddMode }
                            ref={
                                register({
                                    required: { value: true, message: 'Age is required' }
                                })
                            } />
                            <span className="text-danger text-small d-block mb-2">
                                {errors?.age?.message}
                            </span>
                        </div>
                    </div>

                    <div className="row ">
                        <div className="col-md-4 col-form">
                            <label>First Name</label>
                            <input type="text" className="form-control" name="firstName" 
                            disabled={ !isAddMode }
                            ref={
                                register({
                                    required: { value: true, message: 'First Name is required' }
                                })
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
                                register({
                                    required: { value: true, message: 'Last Name is required' }
                                })
                            } />
                            <span className="text-danger text-small d-block mb-2">
                                {errors?.lastName?.message}
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

                    <div id="btnForm" className="col-md-12 btn-content text-right ">
                        <button type="button" onClick={ () => cleanForm() } className="btn btn-outline btn-light mr-5 btn-sm">Reset</button>
                        <button type="submit" className="btn btn-primary btn-sm ">Save</button>
                        {/* <button type="submit" onClick={ () => submitForm('create') } className="btn btn-primary btn-sm ">Save</button> */}
                    </div>
                </form>
            </div>
        </main>
    )

}

export default ClientForm;