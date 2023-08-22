const {Router} = require('express');
const {
    addAdmin,
    updateAdmin,
    findAllAdmins,
    findAdmin
    ,confirmAdmin,
    getYetToValidateUsers
} = require('../Controllers/AdminControllers.js');
const { authenticateUser } = require('../Middlewares/authMiddleware.js');

const routes = Router();


routes.post('/addAdmin',addAdmin);
routes.post('/updateAdmin',updateAdmin);
routes.get('/findAdmin',findAdmin);
routes.get('/findAllAdmins',findAllAdmins);
routes.post('/confirmAdmin',confirmAdmin);
routes.get('/validateUsers',getYetToValidateUsers);


module.exports =routes;