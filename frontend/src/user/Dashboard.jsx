import React from 'react'
import { Link } from 'react-router-dom';
import Layout from '../core/Layout'
import { currentUser } from '../helpers';


function Dashboard() {
  const {name, email, role} = currentUser();

  return (
    <>
       <Layout title='Dashbord' description='Dashbord user' className='container'>
       
        <div className="row">
          <div className="col-md-3">

          <div className="card">
              <div className="card-body">
                <h5 className="card-title">User links</h5>
                <ul className='list-group list-group-flush'>
                  <li className='list-group-item'>
                    <Link className='nav-link' to='/cart'>Cart</Link>
                  </li>
                  <li className='list-group-item'>
                    <Link className='nav-link' to='/cart'>Profile</Link>
                  </li>
                  
                </ul>
              </div>
            </div>

           
          </div>
          <div className="col-md-9 mb-5">
          <div className="card mb-1">
              <div className="card-body">
                <h5 className="card-title">User information</h5>
                <ul className='list-group list-group-flush'>
                  <li className='list-group-item'>{name}</li>
                  <li className='list-group-item'>{email}</li>
                  <li className='list-group-item'>{role ? 'Admin' : 'User'}</li>
                </ul>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Purshase history</h5>
                <ul className='list-group list-group-flush'>
                  <li className='list-group-item'>History</li>
                </ul>
              </div>
            </div>
        
          </div>
         
        </div>

       </Layout>
    </>
  )
}

export default Dashboard