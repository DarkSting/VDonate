const {
  findAllCampaign,
  updateCampaign,
  createCampaign,
  findPendingCampaigns,
  cancellCampaign,
  getCancelledCampaigns,
  updateBloodBag,
  findCompletedActions,
  findStaffAndDonors,
  findStaffAndDonorsExpand,
} = require("../Controllers/CampaignControllers");

const { Router } = require("express");
const {
  authenticateUser,
  authenticateUserMiddleware,
} = require("../Middlewares/authMiddleware");

const routes = Router();

routes.post("/addCampaign", createCampaign);
routes.post("/updateCampaign", updateCampaign);
routes.get("/findAllCampaigns", findAllCampaign);
routes.get("/getpendingcampaigns", findPendingCampaigns);
routes.put("/cancellcampaign", cancellCampaign);
routes.get("/getcancellcampaigns", getCancelledCampaigns);
routes.get("/gethomepageinfo", findCompletedActions);
routes.put("/updatebloodbag", authenticateUserMiddleware, updateBloodBag);
routes.get("/getstaffanddonors", findStaffAndDonors);
routes.get("/getstaffanddonorsexpand", findStaffAndDonorsExpand);

module.exports = routes;
