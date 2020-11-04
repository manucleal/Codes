// System 
import React from 'react';
import { useForm } from 'react-hook-form';

const VenueForm = (props) => {

    const { register, errors, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        props.addVenue(data);
        reset();
    }

    return (
        <form className="form-groups" onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <div className="col-md-6 col-form">
                    <label>Add Venues</label>
                    <input type="text" className="form-control" name="name" placeholder="Venue Name" ref={
                        register({
                            required: { value: true, message: 'Name is required' }
                        })
                    } />
                    <span className="text-danger text-small d-block mb-2">
                        {errors?.name?.message}
                    </span>
                </div>
            </div>

            <div  className="col-md-6 btn-content text-right ">
                <button type="button" onClick={ () => reset() } className="btn btn-outline btn-light mr-5 btn-sm">Reset</button>
                <button type="submit" className="btn btn-primary btn-sm ">Save</button>
            </div>
        </form>
    )

}

export default VenueForm;