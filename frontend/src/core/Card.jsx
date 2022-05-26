import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import ShowImage from './ShowImage'
import { addToCart } from '../cart'

const Card = ({product, showViewBtn = true}) => {

    const showStock = (quantity) => {
     
         return quantity > 0 ? <span className="badge badge-primary">{quantity} In Stock</span> : <span className="badge badge-danger">Out of Stock</span>
      
    }

    return (
        <div>
          <div className="card bg-light text-black mb-2 ">
              <div className="card-header">
                <h4 className=" text-center">{product.name}</h4> </div>
               <ShowImage item={product} url="product/photo" className="card-img-top"></ShowImage>
                <div className="card-body">
                  <p>{product.description.substring(0, 50)}...</p>
                
                  <div className=" my-3">
                     <span style={{fontSize: '20px'}} className="badge badge-info">${product.price}</span> 
                     &nbsp;&nbsp;
                     <span className="ml-auto badge-pill ">{product.category.name}</span> 

                  </div>

                  <div className="well">
                     <h4>{showStock(product.quantity)}</h4> 
                      
                      <span>Added {moment(product.createdAt).fromNow()}</span>

                  </div>

                  {showViewBtn && (

                      <Link to={`/product/${product._id}`}>
                        <button className="btn btn-warning mr-1">View</button>
                      </Link>
                  
                  )}
                      &nbsp;&nbsp;
                  { product.quantity > 0 && (
                    <button onClick={() => addToCart(product)} className=" btn btn-success">Add to Cart</button>

                  ) }
              </div>
          </div>

        </div>
    )
}

export default Card