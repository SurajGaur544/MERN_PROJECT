import React from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import './style.css';

import  ProductAdd  from './ProductAdd';
import Productlist from './Productlist';
import UpdateList from './UpdateList';


export default function Nav()  {
    const navigate = useNavigate()
    

    

    // console.warn(JSON.parse(auth).result.name);
    return (
        <div className='main-navbar1'>
        <div className='main-navbar'>
            <nav>
            
                <ul className='nav-bar'>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/addproduct">Add Product</Link>
                    </li>
                    {/* <li>
                        <Link to="/updateproduct">Update Product</Link>
                    </li> */}
                </ul>
                
            </nav>
            </div>
            <Routes>
                <Route path='/' element={<Productlist />} />
                <Route path='/addproduct' element={ <ProductAdd /> } />
                <Route path='/updateproduct/:id' element={<UpdateList />} />
            </Routes>
        
        </div>
    )
}
// Nav; {"message":"success","user":{"_id":"65c1c233cf4893dfa67796d2","name":"Suraj Kumar","email":"suraj123@gmail.com","__v":0}}