const {Router} = require('express');
const {
    addAdmin,
    updateAdmin,
    findAllAdmins,
    findAdmin
    ,confirmAdmin
} = require('../Controllers/AdminControllers.js');

const routes = Router();


routes.post('/addAdmin',addAdmin);
routes.post('/updateAdmin',updateAdmin);
routes.get('/findAdmin',findAdmin);
routes.get('/findAllAdmins',findAllAdmins);
routes.post('/confirmAdmin',confirmAdmin);


module.exports =routes;