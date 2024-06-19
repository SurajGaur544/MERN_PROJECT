import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import './style.css';

const UpdateList = () => {
    
    const [arrayData, setArrayData] = useState([]);
    const [error, setError] = useState(false);
    const params = useParams();
    
    const navigate = useNavigate()
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('')

    const [data, setData] = useState({
        name:"",
        price: "",
        category: "",
        company: ""
    })

    useEffect(() => {
        
        getproductsdetail();
    },[])

    const getproductsdetail = async () => {
        let result = await fetch(`http://localhost:4600/${params.id}`,
        {
            method: "get",
            headers:{
                "Content-Type":"Application/json",
                "Accept":"Application/json"
            }
       }
        );
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }
    

    const inputData = (e) => {
        const value = e.target.value;
        const nameProperty = e.target.name;
        setData({...data, [nameProperty] : value });
    }

     const updateProduct = async(e) => {
    //     if(!data.name || !data.price || !data.category || !data.company ){
    //         setError(true);
            
    //     }
        e.preventDefault();
        setArrayData([...arrayData, data]);
        console.log(data);

        let result = await fetch(`http://localhost:4600/${params.id}`,{
            method: "PUT",
            body: JSON.stringify({name, price, category, company}),
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
                <h1>Update Product</h1>
                <form>
                    <input type='text' placeholder='Inter Product Name' className='input1' 
                    onChange={(e) => { setName(e.target.value)}} name='name' value={name}
                    />
                    {error && !data.name && <span className="inputError">Please enter correct name</span>}

                    <input type='text' placeholder='Inter Product Price' className='input1'
                    onChange={(e) => { setPrice(e.target.value)}} name='price' value={price}
                    />
                    {error && !data.price && <span className="inputError">Please enter correct price</span>}

                    <input type='text' placeholder='Inter Product Category' className='input1'
                    onChange={(e) => { setCategory(e.target.value)}} name='category' value={category}
                    />
                    {error && !data.category && <span className="inputError">Please enter correct category</span>}

                    <input type='text' placeholder='Inter Product Company' className='input1'
                    onChange={(e) => { setCompany(e.target.value)}} name='company' value={company}
                    />
                    {error && !data.company && <span className="inputError">Please enter correct company</span>}
                    
                    <button type='Submit' onClick={updateProduct}>Update Product</button>
                </form>
            </div>
        
        </>
    )
}

export default UpdateList;