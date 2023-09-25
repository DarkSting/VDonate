const {
  addComplain,
  findAllComplains,
  findComplain,
  updateComplain,
} = require("../Controllers/ComplainController");

const { Router } = require("express");

const routes = Router();

routes.post("/addCampaign", addComplain);
routes.post("/updateCampaign", updateComplain);
routes.get("/findAllCampaigns", findAllComplains);
routes.get("/findCampaign", findComplain);

module.exports = routes;
