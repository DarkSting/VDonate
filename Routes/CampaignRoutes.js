const{
    findAllCampaign,
    findCampaign,
    updateCampaign,
    createCampaign
} = require('../Controllers/CampaignControllers');

const {Router} = require('express');

const routes = Router();

routes.post('/addCampaign',createCampaign);
routes.post('/updateCampaign',updateCampaign);
routes.get('/findAllCampaigns',findAllCampaign);
routes.get('/findCampaign',findCampaign);



module.exports = routes;