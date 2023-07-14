const {Router} = require('express');
const {
    addUser,
    updateUser,
    findAllUsers,
    findUser,
    loginUser,
    makeRequest,
    welcomeUser
} = require('../Controllers/UserControllers.js');
const{authenticateUser} = require('../Middlewares/authMiddleware.js')

const routes = Router();


routes.post('/addUser',addUser);
routes.post('/updateUser',updateUser);
routes.get('/findUser',findUser);
routes.get('/findAllUsers',findAllUsers);
routes.post('/loginUser',loginUser);
routes.post('/makeRequest',makeRequest);
routes.get('/userDashBoard',welcomeUser);


module.exports =routes;