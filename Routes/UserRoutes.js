const {Router} = require('express');
const {
    addUser,
    updateUser,
    findAllUsers,
    findUser,
    validateUser,
    getUser,
    loginUser
} = require('../Controllers/UserControllers.js');
const{authenticateUser} = require('../Middlewares/authMiddleware.js')

const routes = Router();


routes.post('/addUser',addUser);
routes.post('/updateUser',updateUser);
routes.get('/findUser',findUser);
routes.get('/findAllUsers',findAllUsers);
routes.post('/validateUser',validateUser)
routes.post('/getUser',getUser);
routes.post('/loginUser',authenticateUser,loginUser);


module.exports =routes;