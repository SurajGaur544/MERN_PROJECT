const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/e-comm')
.then(()=>{
    console.log('Connection is successfull');
}).catch((e)=>{
   console.log('Connection is not successfull',e);
});