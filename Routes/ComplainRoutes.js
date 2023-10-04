const{
    addComplain,
    findAllComplains,
    findComplain,
    updateComplain

} = require('../Controllers/ComplainController');

const {Router} = require('express');

const routes = Router();

routes.post('/addCampaign',addComplain);
routes.post('/updateCampaign',updateComplain);
routes.get('/findallcomplaints',findAllComplains);
routes.get('/findcomplaint',findComplain);

module.exports = routes;