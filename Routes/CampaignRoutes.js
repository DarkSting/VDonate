const {
  findAllCampaign,
  updateCampaign,
  createCampaign,
  findPendingCampaigns,
} = require("../Controllers/CampaignControllers");

const { Router } = require("express");

const routes = Router();

routes.post("/addCampaign", createCampaign);
routes.post("/updateCampaign", updateCampaign);
routes.get("/findAllCampaigns", findAllCampaign);
routes.get('/getpendingcampaigns',findPendingCampaigns);

module.exports = routes;
