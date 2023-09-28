const {Router} = require('express');
const {
    addUser,
    updateUser,
    findAllUsers,
    findUser,
    loginUser,
    makeRequest,
    welcomeUser,
    makeComplain,
    updateUserApproval,
    getCampaigns
} = require('../Controllers/UserControllers.js');
const{authenticateUser, authenticateUserMiddleware} = require('../Middlewares/authMiddleware.js');
const { makeDonationRequest, createDonation } = require('../Controllers/DonationController.js');
const { sendmail } = require('../Controllers/MailControllers.js');
const { getYetToValidateUsers } = require('../Controllers/AdminControllers.js');

const routes = Router();

routes.post('/addUser',addUser);
routes.post('/updateUser',updateUser);
routes.get('/findUser',findUser);
routes.get('/findAllUsers',findAllUsers);
routes.post('/loginUser',loginUser);
routes.post('/makeRequest',makeRequest);
routes.get('/userDashBoard',welcomeUser);
routes.post('/makeComplain',makeComplain);
routes.post('/makeDonationRequest',makeDonationRequest);
routes.put('/updateUserApproval',updateUserApproval);
routes.post('/mail',sendmail);
routes.get('/getcampaigns',getCampaigns);


module.exports =routes;