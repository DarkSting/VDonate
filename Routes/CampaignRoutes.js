const {
    findAllCampaign,
    updateCampaign,
    createCampaign,
    findPendingCampaigns,
    cancellCampaign,
    getCancelledCampaigns,
    updateBloodBag,
  } = require("../Controllers/CampaignControllers");
  
  const { Router } = require("express");
const { authenticateUser, authenticateUserMiddleware } = require("../Middlewares/authMiddleware");
  
  const routes = Router();
  
  routes.post("/addCampaign", createCampaign);
  routes.post("/updateCampaign", updateCampaign);
  routes.get("/findAllCampaigns", findAllCampaign);
  routes.get('/getpendingcampaigns',findPendingCampaigns);
  routes.put('/cancellcampaign',cancellCampaign);
  routes.get('/getcancellcampaigns',getCancelledCampaigns);
  routes.put("/updatebloodbag",authenticateUserMiddleware, updateBloodBag);
  
  module.exports = routes;