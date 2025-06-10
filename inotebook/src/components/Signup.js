import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';



export default function Signup(props) {
    const [creds, setCreds] = useState({name: "", email: "", password: "", cpassword: ""});
    let history = useNavigate();
    
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const url = "http://localhost:5000/api/auth/createuser";

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({name: creds.name, email: creds.email, password: creds.password, cpassword: creds.cpassword})
        });
        const json_res = await response.json();
        console.log(json_res);
        
        if (json_res)
        {
            localStorage.setItem('token', json_res.auth_token)
            history("/");
            props.showAlert("Successfully signed up", "success")
        }
        else
        {
            props.showAlert("invalid creds", "danger");
        }
    }




    const handleChange = (e)=>{
        setCreds({...creds, [e.target.name]: e.target.value})
    }


    return (
        <div className='container mt-2'>
            <h2 className='my-2'>Signup</h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Username</label>
                <input type="name" className="form-control" id="name" name="name" onChange={handleChange}/>
            </div>

            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name="email" onChange={handleChange}/>
            </div>

            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name="password" onChange={handleChange}/>
            </div>

            
            <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={handleChange}/>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
