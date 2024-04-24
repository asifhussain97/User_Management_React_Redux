const asyncHandler = require('express-async-handler')
const User = require('../model/user')

const getGoals=asyncHandler(async (req,res)=>{
    cons
    res.status(200).json({message: 'Get goals'})
})

const setGoals=asyncHandler(async (req,res)=>{
    if(!req.body.text){
        res.status(400).json({message:'please add a text'})
    }
    res.status(200).json({message:'Set goal'})
})

const updateGoals=asyncHandler(async (req,res)=>{
    res.status(200).json({message:`Update goal ${req.params.id}`})
})

const deleteGoals=asyncHandler(async (req,res)=>{
    res.status(200).json({message:`Delete goal ${req.params.id}`})
})

module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}