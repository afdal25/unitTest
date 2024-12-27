const express =  require('express')
const menu = require('../controller/menuController')
const route  = express.Router()
//GET MENU
route.get('/',menu.getMenu)
route.post('/',menu.insertMenu)
route.put('/:id',menu.updateMenu)
route.delete('/:id',menu.deleteMenu)

module.exports = route