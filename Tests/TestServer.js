const express = require("express");
const cors = require("cors");
const UserRoutes = require("../Routes/UserRoutes.js");
const AdminRoutes = require("../Routes/AdminRoutes.js");
const ComplainRoutes = require("../Routes/ComplainRoutes.js");
const CampaignRoutes = require("../Routes/CampaignRoutes.js");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config();

//app configuratio`n
const app = express();
app.set("trust proxy", true);
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/user", UserRoutes);
app.get("/remove-cookie", (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.sendStatus(200);
});
app.use("/admin", AdminRoutes);
app.use("/donation", require("../Routes/DonationRoutes.js"));
app.use("/complain", ComplainRoutes);
app.use("/campaign", require('../Routes/CampaignRoutes.js'));
app.get("/getCookie", (req, res) => {

  res.cookie("jwt", false);
  res.status(200).json("you got cookies");
  
});


module.exports =  app ;