import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const Productlist = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        productList();
    }, []);

    const productList = async() =>{
        const result = await fetch('http://localhost:4600/products');
        const jsonRes = await result.json();
        console.warn(jsonRes);
        setData(jsonRes);
        
    }
    
    const deleteProduct = async(id) => {
        console.log(id);
        let result = await fetch(`http://localhost:4600/${id}`,{
            method:"delete",
            headers: {
                "Content-Type":"Application/json",
                "Accept": "application/json",
            }
        });
        result = await result.json();
        console.warn(result);
        if(result){
            productList();
        }

        
    }
    const searchHandle = async (event) => {
        
        let key = event.target.value;
        if(key){
            let result = await fetch(`http://localhost:4600/search/${key}`,{
                method: "get",
                headers:{
                    "Content-Type": "Application/json",
                    "Accept":"Application/json",
                }
            });
    
            result = await result.json();
            console.warn(result);
            if(result){
                setData(result);
            }
        }else{
            productList();
        }
        

    }
    return (
        <div className="parent-div">
            <div className="list-product">
            <br /><br /><br />
                <h1>Product List</h1>
                <input type="text" className="search-product-box" placeholder="Search Product" 
                onChange={searchHandle} />
                <table className="table flex items-center justify-center">
                    <tr>
                        <th>S.N.</th>
                        <th>Name</th>
                        <th>Company</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Opration</th>
                        
                    </tr>
                    {
                        data.length > 0 ?  data.map((item, index) => 
                            <tr key={item._id}>
                                <td>{index+1}</td>
                                <td>{item.name}</td>
                                <td>{item.company}</td>
                                <td>{item.price}</td>
                                <td>{item.category}</td>
                                <td className="table-data">
                                    <button onClick={() => deleteProduct(item._id)}>Delete</button> 
                                    <Link to={'updateproduct/'+ item._id} className="flex items-center justify-center bg-red p-2 rounded m-1 " >Update</Link>
                                </td>
                            </tr>
                        )
                        :
                        <h1 style={{position:'absolute',justifyContent:'center', alignItems:'center', color:'maroon',boxShadow:'0px 0px 30px rgb(48, 245, 65)'}}>Product Not Found</h1>
                    }
                </table>
                <br /><br /><br />
            </div>
        </div>
    )
}

export default Productlist;