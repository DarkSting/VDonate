const{

    addInventory,
    findAllInventories,
    findinventory,
    updateInventory
} = require('../Controllers/InventoryControllers');

const {Router} = require('express');

const routes = Router();

routes.post('/addInventory',addInventory);
routes.post('/updateInventory',updateInventory);
routes.get('/findAllInventories',findAllInventories);
routes.get('/findInventory',findinventory);

module.exports = routes;