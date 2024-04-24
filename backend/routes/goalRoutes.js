const express = require('express')
const router = express.Router()
const {getGoals,setGoals,updateGoals,deleteGoals} = require('../controllers/goalControllers')

router.get('/',getGoals)

router.post('/',setGoals)

router.route('/:id').put(updateGoals).delete(deleteGoals)

module.exports = router