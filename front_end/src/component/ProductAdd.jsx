import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './style.css';

const ProductAdd = () => {
    
    const [arrayData, setArrayData] = useState([]);
    const [error, setError] = useState(false);
    const [data, setData] = useState({
        name:"",
        price: "",
        category: "",
        company: "",
    })

    const navigate = useNavigate()
    

    const inputData = (e) => {
        const value = e.target.value;
        const nameProperty = e.target.name;
        setData({...data, [nameProperty] : value });
    }

    const ProductList = async(e) => {
        if(!data.name || !data.price || !data.category || !data.company ){
            setError(true);
            
        }
        e.preventDefault();
        setArrayData([...arrayData, data]);

        let result = await fetch('http://localhost:4600/add-product',{
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type':'Application/json',
                'Accept':'Application/json'
            }
        })
        result = await result.json();
        console.log(result);
        navigate('/');
    }
    return (
        <>
            <div className='form'>
            <br /><br /><br />
                <h1>Add Product</h1>
                <form>
                    <input type='text' placeholder='Inter Product Name' className='input1' 
                    onChange={inputData} name='name' value={data.name}
                    />
                    {error && !data.name && <span className="inputError">Please enter correct name</span>}

                    <input type='text' placeholder='Inter Product Price' className='input1'
                    onChange={inputData} name='price' value={data.price}
                    />
                    {error && !data.price && <span className="inputError">Please enter correct price</span>}

                    <input type='text' placeholder='Inter Product Category' className='input1'
                    onChange={inputData} name='category' value={data.category}
                    />
                    {error && !data.category && <span className="inputError">Please enter correct category</span>}

                    <input type='text' placeholder='Inter Product Company' className='input1'
                    onChange={inputData} name='company' value={data.company}
                    />
                    {error && !data.company && <span className="inputError">Please enter correct company</span>}
                    
                    <button type='Submit' onClick={ProductList}>Add Product</button>
                </form>
            </div>
        
        </>
    )
}

export default ProductAdd;