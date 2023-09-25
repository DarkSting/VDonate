const {
  addCampaign,
  findAllCampaign,
  findCampaign,
  updateCampaign,
} = require("../Controllers/CampaignControllers");

const { Router } = require("express");

const routes = Router();

routes.post("/addCampaign", addCampaign);
routes.post("/updateCampaign", updateCampaign);
routes.get("/findAllCampaigns", findAllCampaign);
routes.get("/findCampaign", findCampaign);

module.exports = routes;
