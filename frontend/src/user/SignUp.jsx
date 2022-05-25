import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import Layout from '../core/Layout'
import { API_URL } from '../config'
import toastr from 'toastr'
import "toastr/build/toastr.css"


function SignUp() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setUser({...user, [e.target.id]: e.target.value})
  }

  const handleSubmit = (e) => {
   
    fetch(`${API_URL}/signup`, {
      method: "POST",
      headers:{
        "Accept": "application/json",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(response => {
      if(response.errors){
        toastr.warning(response.errors[0].msg, "Error",{
          positionClass: 'toast-bottom-left'
        })
      }else{
        setUser({name: "", email: "", password: ""});
        toastr.success("user created!", "Succes",{
          positionClass: 'toast-bottom-left'
        })
        navigate('/signin');
      }
    })
    .catch(err =>  toastr.error("Please try again!", "Error",{
      positionClass: 'toast-bottom-left'
    }));
  }

  const form = () => (
    <div className='row'>
      <div className='col-md-6 mx-auto'>
        <div className="form-group">
          <label htmlFor="name" className="text-muted"></label>
          <input onChange={handleChange} type="text" placeholder='name' className="form-control" id="name" />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="text-muted"></label>
          <input onChange={handleChange} type="text" placeholder='email' className="form-control" id="email" />
        </div><div className="form-group">
          <label htmlFor="password" className="text-muted"></label>
          <input onChange={handleChange} type="text" placeholder='password' className="form-control" id="password" /></div>
        <button onClick={handleSubmit} className="mt-3 btn btn-lg btn-block btn-outline-success">Register</button>
      </div>
    </div>
  )

  return (
    <div>
      <Layout title='Sign In' description='Sign in ecommerce app' className='container'>
        {form()}
       </Layout>
    </div>
  )
}

export default SignUp