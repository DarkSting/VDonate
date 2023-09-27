const {
    findAllCampaign,
    updateCampaign,
    createCampaign,
    findPendingCampaigns,
    cancellCampaign,
    getCancelledCampaigns,
  } = require("../Controllers/CampaignControllers");
  
  const { Router } = require("express");
  
  const routes = Router();
  
  routes.post("/addCampaign", createCampaign);
  routes.post("/updateCampaign", updateCampaign);
  routes.get("/findAllCampaigns", findAllCampaign);
  routes.get('/getpendingcampaigns',findPendingCampaigns);
  routes.put('/cancellcampaign',cancellCampaign);
  routes.get('/getcancellcampaigns',getCancelledCampaigns);
  
  module.exports = routes;