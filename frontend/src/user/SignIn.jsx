import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import Layout from '../core/Layout'
import { API_URL } from '../config'
import toastr from 'toastr'
import "toastr/build/toastr.css"


function SignIn() {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setLogin({...login, [e.target.id]: e.target.value})
  }

  const handleSubmit = (e) => {
   
    fetch(`${API_URL}/signin`, {
      method: "POST",
      headers:{
        "Accept": "application/json",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(login)
    })
    .then(response => response.json())
    .then(response => {
      if(response.error){
        toastr.warning(response.error, "Error",{
          positionClass: 'toast-bottom-left'
        })
      }else{
        setLogin({email: "", password: ""});
        toastr.info("Success login!", "Welcome",{
          positionClass: 'toast-bottom-left'
        })
        localStorage.setItem('token', response.token);
        localStorage.setItem('user',JSON.stringify(response.user));
        navigate('/');
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
          <label htmlFor="email" className="text-muted"></label>
          <input onChange={handleChange} type="text" placeholder='email' className="form-control" id="email" />
        </div><div className="form-group">
          <label htmlFor="password" className="text-muted"></label>
          <input onChange={handleChange} type="password" placeholder='password' className="form-control" id="password" /></div>
        <button onClick={handleSubmit} className="mt-3 btn btn-lg btn-block btn-outline-success">
          Login
        </button>
      </div>
    </div>
  )

  return (
    <div>
      <Layout title='Sign In' description='Sign In ecommerce app' className='container'>
        {form()}
       </Layout>
    </div>
  )
}

export default SignIn