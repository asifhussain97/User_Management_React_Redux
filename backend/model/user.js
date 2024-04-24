const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
       
    },
    mobile:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    is_admin:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model("User",userSchema);
