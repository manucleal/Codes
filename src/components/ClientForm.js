import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';

const ClientForm = (props) => {

    const [ selectedOption, setSelectedOption ] = useState(null);
    const { register, errors, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        data.newVenue = selectedOption;
        props.addClient(data);
        reset();
    }

    const cleanForm = () => {
        reset();
    }

    const options = props.venues.map((venue) => {
        return {
            value: venue.id,
            label: venue.name
        }
    });

    const handleChange = (event)  => {
        setSelectedOption(event.value);
    }

    return (
        <main>
            <small><em>Create Client</em></small>
            <div id="content">
                <form className="form-groups" onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="col-md-4 col-form">
                            <label>Name</label>
                            <input type="text" className="form-control" name="name" ref={
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
                            <input type="email" className="form-control" name="email" ref={
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
                            <input type="number" className="form-control" name="age" ref={
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
                            <input type="text" className="form-control" name="firstName" ref={
                                register({
                                    required: { value: true, message: 'First Name is required' }
                                })
                            } />
                            <span className="text-danger text-small d-block mb-2">
                                {errors?.firstName?.message}
                            </span>
                        </div>
                        <div className="col-md-4 col-form">
                            <label>Last Name</label>
                            <input type="text" className="form-control" name="lastName" ref={
                                register({
                                    required: { value: true, message: 'Last Name is required' }
                                })
                            } />
                            <span className="text-danger text-small d-block mb-2">
                                {errors?.lastName?.message}
                            </span>
                        </div>
                        <div className="col-md-2 col-form">
                            <label>Favorite Venues</label>
                            <Select 
                                placeholder="Choose One"
                                value={options.find(obj => obj.value === selectedOption)}
                                options={ options }
                                onChange={ handleChange }
                            />
                        </div>
                    </div>

                    <div id="btnForm" className="col-md-12 btn-content text-right ">
                        <button type="button" onClick={ () => cleanForm() } className="btn btn-outline btn-light mr-5 btn-sm">Reset</button>
                        <button type="submit" className="btn btn-primary btn-sm ">Save</button>
                    </div>
                </form>
            </div >
        </main >
    )

}

export default ClientForm;

    // const onSelect = (selectedList, selectedItem) => {
    //     selectedOption.push(selectedItem.id);
    // }
    
    // const onRemove = (selectedList, selectedItem) => {
    //     selectedOption.splice(selectedOption.indexOf(selectedItem.id), 1);
    // } 