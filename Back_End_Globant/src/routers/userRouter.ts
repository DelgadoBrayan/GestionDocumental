import express from 'express'
import { 
    addUser, 
    deleteUser, 
    getUser, 
    getUsers, 
    updateUser, 
    validateUser,
    getUserId
 } from '../controllers/userController';

const router = express.Router();

router.post('/add', addUser)
router.put('/update/:id', updateUser )
router.delete('delete/:id', deleteUser)
router.get('/getUsers', getUsers)
router.get('/getUser',getUser)
router.get('/getUserId/:id', getUserId)
router.post('/validateUser', validateUser)

export default router;