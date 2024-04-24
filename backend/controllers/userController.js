const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../model/user')


const loginUser = asyncHandler (async (req,res)=>{
    const {email, password} = req.body
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password)) && user.is_admin==0){
        res.json({
            admin:false,
            _id:user.id,
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            token: generateToken(user._id)
        })
    } else if(user && (await bcrypt.compare(password, user.password)) && user.is_admin==1) {
        const nonAdminUsers = await User.find({ is_admin: 0 })
        res.json({
            admin:true,
            _id:user.id,
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            token: generateToken(user._id),
            nonAdminUsers
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})


const registerUser = asyncHandler (async (req,res)=>{
    const {name,mobile,email,password} = req.body
    console.log(req.body,'body');
    if(!name||!email||!password){
        res.status(400)
        throw new Error("Please add fill the fields" )
    }

    const userExist = await User.findOne({email})

    if(userExist){
        res.status(400)
        throw new Error("User already exists")
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    
    const user = await User.create({
        name,
        mobile,
        email,
        password: hashedPassword,
        is_admin:0
    })

    if(user){
        res.status(201).json({
            _id:user.id,
            name: user.name,
            mobile: user.mobile,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }

    res.json({message:'Register User'})
})
const getMe = asyncHandler (async (req,res)=>{
    // const {_id,name,email} = await User.findById(req.user.id)

    res.status(200).json(req.user)
})

const generateToken = (id)=>{
    return jwt.sign({id },process.env.JWT_SECRET,{
        expiresIn: '30d',

    })
}

const editUser = asyncHandler(async (req, res) => {
    try {
      const { userId, name, email, mobile } = req.body;
  console.log(req.body,'body');
      const user = await User.findByIdAndUpdate(
        userId,
        { name, email, mobile },
        { new: true }
      );
  
      if (user) {
        const nonAdminUsers = await User.find({ is_admin: 0 })

        res.status(200).json({
          admin:true,
          _id: user.id,
          name: user.name,
          email: user.email,
          mobile: user.mobile,
          token: req.headers.authorization,
          nonAdminUsers
        });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });


  const userEdit = asyncHandler(async (req, res) => {
    try {
      const { userId, name, email, mobile, image } = req.body;
  
      const user = await User.findByIdAndUpdate(
        userId,
        { name, email, mobile, image },
        { new: true }
      );
  
      if (user) {
        res.status(200).json({
          _id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          mobile: user.mobile,
          token: req.headers.authorization,
        });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
module.exports = {
    registerUser,
    loginUser,
    editUser,
    userEdit,
    getMe
}