const{
    addComplain,
    findAllComplains,
    findComplain,
    updateComplain,
    setComplainWatched

} = require('../Controllers/ComplainController');

const {Router} = require('express');

const routes = Router();

routes.post('/addCampaign',addComplain);
routes.post('/updateCampaign',updateComplain);
routes.get('/findallcomplaints',findAllComplains);
routes.get('/findcomplaint',findComplain);
routes.put('/checkcomplaint',setComplainWatched);

module.exports = routes;