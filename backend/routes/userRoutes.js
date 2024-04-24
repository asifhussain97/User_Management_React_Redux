const express = require('express')
const router = express.Router()
const { registerUser,loginUser,getMe,editUser,userEdit } = require('../controllers/userController')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', getMe)
router.put('/:userId',editUser)
router.put('/userEdit/:userId',userEdit)

module.exports = router