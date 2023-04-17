import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validation from './signupValidation';
import axios from 'axios';

let UserCount = 13;

function Signup() {

    const [values, setValues] = useState({
        uid: UserCount++,
        fname: '',
        lname: '',
        email: '',
        password: '',
        gender: '',
        hometown: '',
        dob: ''
    })

    const [errors, setErrors] = useState({})

    const handleInput = (event) => {
        setValues(prev =>({...prev, [event.target.name]: [event.target.value] }))
    }

    const navigate = useNavigate();
    const handleSubmit = (event) => {

        // const testData = {
        //     uid: 12,
        //     fname: 'Nan',
        //     lname: 'Warrier',
        //     email: 'nwarrier@gmail.com',
        //     password: '123',
        //     gender: 'F',
        //     hometown: 'Scottsdale',
        //     dob: '12/26/2006'
        // }

        const unpacked = {
            //uid: values.uid,
            fname: values.fname[0],
            lname: values.lname[0],
            email: values.email[0],
            password: values.password[0],
            gender: values.gender[0],
            hometown: values.hometown[0],
            dob: values.dob
        }

        event.preventDefault();
        setErrors(validation(values));
        axios.post('http://localhost:3001/api/signup', unpacked)
        .then(response => {
            navigate('/')
        })
        .catch(error => console.error(error));

    }

    return (
        <div className='d-flex justify-content-center align-items-center bg-black vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Sign-Up</h2>
                <form action="" onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="fname"><strong> First Name</strong></label>
                        <input type="fname" placeholder='Enter First Name' name = 'fname'
                        onChange={handleInput} className='form-control rounded-0'/>
                        {errors.firstName && <span className = 'text-danger'> {errors.firstName}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="lname"><strong> Last Name</strong></label>
                        <input type="lname" placeholder='Enter Last Name' name = 'lname'
                        onChange={handleInput} className='form-control rounded-0'/>
                        {errors.lastName && <span className = 'text-danger'> {errors.lastName}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder='Enter Email' name = 'email'
                        onChange={handleInput} className='form-control rounded-0'/>
                        {errors.email && <span className = 'text-danger'> {errors.email}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" placeholder='Enter Password' name = 'password'
                        onChange={handleInput} className='form-control rounded-0'/>
                        {errors.password && <span className = 'text-danger'> {errors.password}</span>}

                    </div>
                    <div className='mb-3'>
                        <label htmlFor="gender"><strong>Gender</strong></label>
                        <input type="gender" placeholder='Enter Gender (M/F)' name = 'gender'
                        onChange={handleInput} className='form-control rounded-0'/>
                        {errors.gender && <span className = 'text-danger'> {errors.gender}</span>}

                    </div>
                    <div className='mb-3'>
                        <label htmlFor="hometown"><strong>Hometown</strong></label>
                        <input type="hometown" placeholder='Enter Hometown' name = 'hometown'
                        onChange={handleInput} className='form-control rounded-0'/>
                        {errors.hometown && <span className = 'text-danger'> {errors.hometown}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="dob"><strong>Date of Birth</strong></label>
                        <input type="date" placeholder='Enter DOB (MM/DD/YYYY)' name = 'dob'
                        onChange={handleInput} className='form-control rounded-0'/>
                        {errors.dob && <span className = 'text-danger'> {errors.dob}</span>}

                    </div>
                    <button onClick={handleSubmit} className='btn btn-success w-100 rounded-0'><strong>Sign up</strong></button>
                    <p></p>
                    <Link to="/" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Log in</Link>                </form>
            </div>
        </div>
    )
}

export default Signup