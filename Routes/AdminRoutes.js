const { Router } = require("express");
const {
  addAdmin,
  updateAdmin,
  findAllAdmins,
  findAdmin,
  confirmAdmin,
  getYetToValidateUsers,
  loginAdmin,
  welcomeAdmin,
  getNewlySignedAdmins,
  updatePasswordAdmin,
  updatePasswordUser,
  rejectAdminSignUp,
  getMessages,
  sendMessage,
  updatePassword,
} = require("../Controllers/AdminControllers.js");
const {
  authenticateUser,
  authenticateAdminMiddleware,
} = require("../Middlewares/authMiddleware.js");

const routes = Router();

routes.post("/addadmin", addAdmin);
routes.post("/loginadmin", loginAdmin);
routes.get("/admindashboard", welcomeAdmin);
routes.put("/updateAdmin",authenticateAdminMiddleware, updateAdmin);
routes.get("/findAdmin", authenticateAdminMiddleware,findAdmin);
routes.get("/findAllAdmins", findAllAdmins);
routes.post("/confirmAdmin", confirmAdmin);
routes.get("/validateUsers", getYetToValidateUsers);
routes.get("/getnewadmins", getNewlySignedAdmins);
routes.post("/updatepassword", updatePasswordAdmin);
routes.post("/updatepassworduser", updatePasswordUser);
routes.put("/rejectadmin", rejectAdminSignUp);
routes.get("/getmessages", authenticateAdminMiddleware, getMessages);
routes.post("/sendmessage", sendMessage);
routes.post("/updatepass", authenticateAdminMiddleware, updatePassword);

module.exports = routes;
