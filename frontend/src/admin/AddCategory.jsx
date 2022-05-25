
import React, { useState } from 'react'
import toastr from 'toastr';
import "toastr/build/toastr.css";
import { currentUser, getToken } from '../helpers';
import { API_URL } from '../config';
import Layout from '../core/Layout';
 
 function AddCategory() {

     const [name, setName] = useState('')

     const handleChange = (e) => {

        setName(e.target.value)
     }


     const submitCategory = (e) => {

        e.preventDefault();

        const token = getToken();
        fetch(`${API_URL}/category/create`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({name})
        })
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                toastr.warning(res.error, 'Please Check form !', {
                    positionClass: "toast-bottom-left",
                })
            }
            else {
                toastr.success(`Category ${name} created`, 'new Category', {
                    positionClass: "toast-bottom-left",
                })

                setName("")

            }

        })
        .catch(err =>  toastr.error(err, 'Server error !', {
                    positionClass: "toast-bottom-left",
                }))
  
     }

     return (
         <div>
             <Layout
               title="Category" 
               description="New category" 
               className="container"
            >
               
               <div className="row">
                   <div className="col-md-6 mx-auto">
                       <form onSubmit={submitCategory}>
                            <div className="form-group">
                                <label htmlFor="" className="text-muted"></label>
                                <input value={name} required autoFocus placeholder="Category name" onChange={handleChange} type="text" className="form-control"/>
                            </div>
                           <button className="btn btn-outline-primary mt-2">New category</button>
                       </form>
                   </div>
               </div>
               
            </Layout>
         </div>
     )
 }
 
 export default AddCategory
 