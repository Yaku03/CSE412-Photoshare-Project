import React, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import validation from './loginValidation'
import axios from 'axios';

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState({})

    const handleInput = (event) => {
        setValues(prev =>({...prev, [event.target.name]: [event.target.value] }))
    }

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(validation(values));
          
        // for (const key in values) {
        //     console.log(`${key}: ${values[key]}`);
        // }

        const unpacked = {
            email: values.email[0],
            password: values.password[0]
        }

        for (const key in unpacked) {
            console.log(`${key}: ${unpacked[key]}`);
        }

        axios.post('http://localhost:3001/api/login', unpacked)
        .then(response => {
            if(response.data === "Success") {
                navigate('/home')
            }
            else {
                alert("Invalid email and/or password")
            }
        })
        .catch(error => console.error(error));
    }


    return (
        <div className='d-flex justify-content-center align-items-center bg-black vh-100'>
            <div className='bg-white p-3 rounded w-25'>
            <h2>Log-In</h2>
                <form action="" onSubmit={handleSubmit}>
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
                    <button onClick={handleSubmit} className='btn btn-success w-100 rounded-0'><strong>Log in</strong></button>
                    <p></p>
                    <Link to="/signup" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create Account</Link>
                </form>
            </div>
        </div>
    )
}

export default Login