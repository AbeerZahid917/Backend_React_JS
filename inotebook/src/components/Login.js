import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';





export default function Login(props) {
    const [creds, setCreds] = useState({email: "", password: ""});
    let history = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const url = "http://localhost:5000/api/auth/login";

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({email: creds.email, password: creds.password})
        });
        const json_res = await response.json();
        console.log(json_res);

        if (json_res.success)
        {
            // save the auth token and redirect
            localStorage.setItem('token', json_res.auth_token)
            history("/");
            props.showAlert("successfully logged in", "success");
        }
        else
        {
            props.showAlert("invalid creds","danger")
        }
    }


    const handleChange = (e)=>{
        setCreds({...creds, [e.target.name]: e.target.value})
    }



  return (
    <div className='mt-2'>
        <h2 className='my-2'>Login</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" value={creds.email} onChange={handleChange} id="email" name="email"/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" value={creds.password} onChange={handleChange} id="password" name="password"/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}
