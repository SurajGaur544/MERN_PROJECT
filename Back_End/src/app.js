const express = require( 'express' );
const app = express();
require('./db/config');
const ProductData = require('./models/Product');
const cors = require('cors');

const port = process.env.PORT || 4600;


const corsOption = {
    origin: "http://localhost:3001",
    method: "GET, POST, PUT, PATCH, HEAD, DELETE",
    credential: true
}

app.use(express.json());
app.use(cors(corsOption));

 
 //  add data in database
app.post('/add-product',  async(req, res) => {
    try{
       const data = await ProductData(req.body);
       const result = await data.save();
       if(!result){
        res.status(404).json({message: "data not found"});
       }
       return res.status(201).json({message: "success", result});
       
    }catch(e){
        res.status(500).json({ message: "Internal Server Error"});
    }
})

// find all Data in databases
app.get('/products',  async(req, res) => {
    try{
        let result = await ProductData.find();
        if(result){
            //return res.status(200).json({ message: "success", result});
            res.send(result);
        }else{
            res.send("data not found");
        }
    }catch(e){
        res.status(500).json({ message: "Internal Server Error ", e});
    }
});

 // delete data in database
app.delete('/:id', async (req, res) => {
    try{
        
        // let _id = req.params.id;
        // console.warn(_id);
        let result = await ProductData.deleteOne({ _id: req.params.id });
        res.send(result);
        // console.warn(result);
        // if(result){
        //     res.status(200).json({ message: "success", result});
        // }
        // return res.status(404).json({ message: " Not Found", result});
    }catch(e){
        return res.status(500).json({ message: "Internal Server Error ", e});
        // console.warn(e);
    }
});

 // search data in database from id
app.get('/:id', async (req, res) => {
    try{
        
        let _id = req.params.id;
        let result = await ProductData.findOne({ _id});
        res.send(result);
        // // // console.warn(result);
        // if(result){
        //     res.status(200).json({ message: "success", result});
        // }
        // return res.status(404).json({ message: " Not Found", result});
    }catch(e){
        return res.status(500).json({ message: "Internal Server Error ", e});
    }
})

// update data in database from key
app.put('/:id', async (req, res) => {
    try{
        let result = await ProductData.updateMany(
            {_id: req.params.id },
            { $set: req.body }
        )
        res.send(result);
    }catch{
        return res.status(500).json({ message: "Internal Server Error ", e});
    }
})

// search data in database
app.get('/search/:key', async (req, res) => {
    try{
       
        let result = await ProductData.find({
            
            "$or": [
                { name: { $regex: req.params.key }},
                { category: { $regex: req.params.key }},
                { company: { $regex: req.params.key }},
                { price: { $regex: req.params.key }}
            ]
        })
        res.send(result);
        // if(result){
        //     res.status(200).json({ message: "success", result});
        // }
        // return res.status(404).json({ message: " Not Found", result});
    }catch(e){
        
        return res.status(500).json({ message: "Internal Server Error ", e});
        
    }
})

app.listen(port, () => {
    console.log(`connection live at port ${port}...`);
});