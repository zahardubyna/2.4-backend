import express from 'express'
const router = express.Router()

import {register, login, logout, getItems, changeItem, addItem, deleteItem} from '../controllers/controllers'

router.route('/login').post(login)
router.route('/register').post(register)
router.route('/logout').post(logout)
router.route('/items').get(getItems)
router.route('/items').post(addItem)
router.route('/items').put(changeItem)
router.route('/items').delete(deleteItem)

export default router