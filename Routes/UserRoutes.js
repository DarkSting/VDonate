const { Router } = require("express");
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
  getCampaigns,
  getBloodBag,
  sendMessage,
  getMessages,
  getSentMessages,
  deleteUser,
  getUserLocations,
  updatePassword,
  getuser,
} = require("../Controllers/UserControllers.js");
const { makeDonationRequest } = require("../Controllers/DonationController.js");
const { sendmail } = require("../Controllers/MailControllers.js");
const {
  authenticateUserMiddleware,
} = require("../Middlewares/authMiddleware.js");

const routes = Router();

routes.post("/addUser", addUser);
routes.put("/updateUser",authenticateUserMiddleware,updateUser);
routes.get("/findUser",authenticateUserMiddleware,findUser);
routes.get("/getuser",getuser);
routes.get("/findAllUsers", findAllUsers);
routes.post("/loginUser", loginUser);
routes.post("/makeRequest", makeRequest);
routes.get("/userDashBoard", welcomeUser);
routes.post("/makeComplain", makeComplain);
routes.post("/makeDonationRequest", makeDonationRequest);
routes.put("/updateUserApproval", updateUserApproval);
routes.post("/mail", sendmail);
routes.get("/getcampaigns", getCampaigns);
routes.get("/getbloodbag", getBloodBag);
routes.get("/getmessages", getMessages);
routes.get("/getsentmessages", getSentMessages);
routes.post("/sendmessage", sendMessage);
routes.delete("/deleteuser", deleteUser);
routes.get("/getdonorslocation", getUserLocations);
routes.post("/updatepass", authenticateUserMiddleware, updatePassword);

module.exports = routes;
