const mongoose = require("mongoose");
const { DonationRequestModel } = require("../Models/DonationRequestModel");
const { UserModel } = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const { DonationModel } = require("../Models/DonationModel");
const { ComplainModel } = require("../Models/ComplainModel");
const { resolver } = require("../Middlewares/IPResolver");
const { updatePasswordUser } = require("./AdminControllers");
const { CampaignModel } = require("../Models/CampaignModel");
const BloodBagModel = require("../Models/BloodBagModel");
const { MessageModel } = require("../Models/UserMessageModel");
const { AdminModel } = require("../Models/AdminModel");
const bcrypt = require("bcrypt");
const webtoken = require('jsonwebtoken');

//set the living time of the cookie which will be set in the login
const maxAge = 2 * 60 * 60;

/*GET
authenticate user
*/
const welcomeUser = (req, res) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        console.log(err.message);
        res.status(500).json("invalid token");
      } else {
        UserModel.findOne({ _id: decoded.id })
          .then((r) => {
            res
              .status(200)
              .json({ name: r.userName, id: r._id, location: r.location });
          })
          .catch((er) => {
            res.status(404).json({ msg: "user not found", code: 500 });
          });
      }
    });
  } else {
    res.status(404).json({ msg: "token not found", code: 500 });
  }
};

//sends a message
const sendMessage = async (req, res) => {
  const { user, description, receiver } = req.body;

  if (!user || !receiver) {
  }

  try {
    const foundUser = await UserModel.findOne({ userName: user });

    const foundReceiver = await AdminModel.findOne({ userName: receiver });

    const newMessage = new MessageModel({
      description: description,
      sender: foundUser.userName,
      senderID: foundUser._id,
      receiver: foundReceiver.userName,
      receiverID: foundReceiver._id,
    });

    await newMessage.save();
    return res.status(200).json({ msg: "message sent" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};


const updatePassword = async (req, res) => {
  const { oldPassword, newPassword, user } = req.body;

  console.log(oldPassword);
  console.log(newPassword);

  let foundUser = await UserModel.findOne({ _id: user._id });

  const auth = await bcrypt.compare(oldPassword, foundUser.password.trim());

  console.log(auth);

  if (auth && foundUser) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPassword.trim(), salt);

    foundUser.password = hashedPassword;

    console.log(auth);

    await UserModel.findOneAndUpdate(
      { _id: user._id },
      { password: hashedPassword }
    );

    return res.status(200).json({ msg: "Password updated" });
  }

  return res.status(500).json({ msg: "Password update failed" });
};

const getMessages = async (req, res) => {
  const { user } = req.query;

  try {
    const foundMessages = await MessageModel.find({ receiverID: user }).sort({
      createdAt: -1,
    });

    if (foundMessages.length > 0) {
      return res.status(200).json({ foundMessages });
    } else {
      return res.status(500).json({ msg: "no messages found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const getSentMessages = async (req, res) => {
  const { user } = req.query;

  try {
    const foundMessages = await MessageModel.find({
      senderID: new mongoose.Types.ObjectId(user),
    });
    console.log(user);
    if (foundMessages.length > 0) {
      return res.status(200).json({ foundMessages });
    } else {
      return res.status(500).json({ msg: "no messages found" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getUserLocations = async (req, res) => {
  const { bloodType } = req.query;

  const type = ["A+","A-","B+","B-","AB+","AB-","O+","O-","N-"]

  let foundUsers = [];

  const t = bloodType.toString();

  console.log(typeof(t))

  if (type[bloodType] === "N-") {
    foundUsers = await UserModel.find({});
  } else {
    foundUsers = await UserModel.find({ bloodType:type[bloodType]});
    console.log(foundUsers);
  }

  let usersLocation = [];

  if (foundUsers) {
    for (let currentUser of foundUsers) {
      let newOBJ = {};
      newOBJ.name = currentUser.userName;
      newOBJ.phone = currentUser.phone;
      newOBJ.location = currentUser.location;
      newOBJ.age = currentUser.age;

      usersLocation.push(newOBJ);
    }

    return res.status(200).json(usersLocation);
  } else {
    return res.status(200).json({ msg: "no users found" });
  }
};

const updateUserApproval = async (req, res) => {
  const { approval, objectId } = req.body;

  UserModel.updateOne({ _id: objectId }, { isValidated: approval })
    .then((r) => {
      console.log(r);
    })
    .catch((err) => {
      return res.status(500).json({ msg: "user cannot approved", code: 500 });
    });

  const status = await updatePasswordUser(objectId);

  console.log(status);
  if (status) {
    return res.status(200).json({ msg: "password is updated" });
  } else {
    return res.status(500).json({ msg: "couldnt update the password" });
  }
};

//get assigned campaign
const getCampaigns = async (req, res) => {
  const { name } = req.query;

  const foundUser = await UserModel.findOne({ userName: name });

  console.log(foundUser);

  async function searchAndExtractDocument(searchValue) {
    try {
      const document = await CampaignModel.findOne({
        $and: [
          { donors: new mongoose.Types.ObjectId(searchValue) },
          { isCancelled: false },
        ],
      });

      if (document) {
        console.log("Document found:", document);
        return document;
      } else {
        console.log("Document not found");
        return null;
      }
    } catch (error) {
      console.error("Error searching for document:", error);
      throw error;
    }
  }

  try {
    const document = await searchAndExtractDocument(foundUser._id);
    return res.status(200).json({ msg: document });
  } catch (error) {
    return res.status(200).json({});
  }
};

const crateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: maxAge });
};

/*POST
adds a users to the database
*/
const addUser = async (req, res) => {
  const {
    name,
    age,
    nic,
    gender,
    email,
    phone,
    bloodType,
    password,
    latitude,
    longitude,
    address,
  } = req.body;

  try {
    var newUser = new UserModel({
      userName: name,
      email: email,
      phone: phone,
      gender: gender,
      bloodType: bloodType,
      age: age,
      nic: nic,
      password: password,

      location: {
        latitude: latitude,
        longitude: longitude,
        name: address,
      },
    });

    const result = await newUser.save();
    const token = crateToken(result._id);
    res.cookie("jwt", token, { httpOnly: true });
    return res.status(201).json(token);
  } catch (error) {
    return res.status(500).json({ msg: error.message, code: 500 });
  }
};

/**
 GET
 gets the current user blood bag
 */
const getBloodBag = async (req, res) => {
  const { name } = req.query;

  const user = await UserModel.findOne({ userName: name });

  console.log("getting user bloodbag");

  const foundBloodBag = await BloodBagModel.findOne({
    $and: [{ donor: user._id }, { filled: false }],
  });

  if (foundBloodBag) {
    return res.status(200).json({ foundBloodBag });
  } else {
    return res.status(500).json({ msg: "no blood bags available" });
  }
};

/*GET
logges in a user if the user exists
*/
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log(password);

  try {
    const user = await UserModel.login(email, password);


    if (user) {

    

        const token = crateToken(user._id);
        console.log(token);
        res.cookie("jwt", token, { httpOnly: true });
        console.log("token attached")

      
  
      res.status(200).json({ user: user._id });
      
    } else {
      return res.status(500).json({ msg: "user not found", code: 200 });
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message, code: 500 });
  }
};

const deleteUser = async (req, res) => {
  const { user } = req.query;

  console.log(user);

  const deletedUser = await UserModel.findOneAndDelete({ userName: user });

  if (deletedUser) {
    return res.status(200).json({ msg: "user deleted successfully" });
  } else {
    return res.status(500).json({ msg: "failed to delete the user" });
  }
};

/*GET
findUsers
*/
const findAllUsers = async (req, res, next) => {
  const foundUsers = await UserModel.find({ isValidated: true });

  let users = [];

  if (foundUsers) {
    for (let current of foundUsers) {
      let newOBJ = {};
      newOBJ.name = current.userName;
      newOBJ.userUD = current._id;
      newOBJ.phone = current.phone;
      newOBJ.email = current.email;
      newOBJ.nic = current.nic;
      newOBJ.bloodType = current.bloodType;

      users.push(newOBJ);
    }
  }

  if (users.length > 0) {
    return res.status(200).json({ users });
  }

  return res.status(500).json({ msg: "cannot find any users" });
};

/*POST
making requests by the user and it will be tested by an
admin
*/
const makeRequest = async (req, res) => {
  const { DonorID, donationType } = req.body;

  let id = 0;

  const list = await DonationRequestModel.find({}).sort({ refNo: -1 });

  if (list.length === 0) {
    id = 1;
  } else {
    id = list[0].refNo + 1;
  }

  const time = new Date(0);

  console.log(time);

  const newReq = new DonationRequestModel({
    refNo: id,
    donationType: donationType,
    Donor: DonorID,
    approvedDate: time,
  });

  newReq
    .save()
    .then((r) => {
      res.status(200).json({ msg: "request has sent", code: 200 });
    })
    .catch((er) => {
      res.status(500).json({ msg: "model saving error", code: 500 });
    });
};

/**
 * POST
 * making a complain
 */

const makeComplain = async (req, res) => {
  const { User, description } = req.body;
  const token = req.cookies.jwt;

  let refid = 0;

  console.log(User);

  const list = await ComplainModel.find({}).sort({ refNo: -1 });

  if (list.length === 0) {
    refidid = 1;
  } else {
    refid = parseInt(list[0].refNo) + 1;
  }
  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        console.log(err.message);
        res.status(500).json("invalid token");
      } else {
        UserModel.findOne({ _id: decoded.id })
          .then((r) => {
            const newComplain = new ComplainModel({
              User: decoded.id,
              description: description,
              refNo: refid,
            });
            console.log(description);

            newComplain
              .save()
              .then((r) => {
                res.status(201).json({ msg: "complain has made", code: 200 });
              })
              .catch((err) => {
                res
                  .status(500)
                  .json({ msg: "complain failed to create", code: 500 });
              });
          })
          .catch((er) => {
            res.status(404).json({ msg: "user not found", code: 500 });
          });
      }
    });
  } else {
    res.status(404).json({ msg: "token not found", code: 500 });
  }
};

/*GET
finds a user
*/
const findUser = async (req, res, next) => {
  const { user } = req.body;

 const foundUser = await UserModel.findOne({
    _id:user._id
  })

  let obj = {}
  obj.username = foundUser.userName;
  obj.phoneNumber = foundUser.phone;
  obj.email = foundUser.email
  obj.bloodType = foundUser.bloodType;
  obj.nic = foundUser.nic;
  obj.location = foundUser.location.name
  

  return res.status(200).json(obj)
   
};

/*get
//getting a user
*/
const getuser = async (req, res, next) => {
  const { user } = req.query;

 const foundUser = await UserModel.findOne({
    userName:user
  })

  let obj = {}
  obj.username = foundUser.userName;
  obj.phoneNumber = foundUser.phone;
  obj.email = foundUser.email
  obj.bloodType = foundUser.bloodType;
  obj.nic = foundUser.nic;
  obj.location = foundUser.location.name
  

  return res.status(200).json(obj)
   
};

/*PUT

updates a user

*/
const updateUser = async (req, res, next) => {
 
    const {

    username,
    email,
    phoneNumber,
    user

  } = req.body;

  const foundUser = await UserModel.findOneAndUpdate({_id:user._id},{userName:username,email:email, phone:phoneNumber})


  return res.status(200).json({ msg: "user updated", code: 200 });
};

module.exports = {
  addUser,
  updateUser,
  findAllUsers,
  findUser,
  makeRequest,
  loginUser,
  welcomeUser,
  makeComplain,
  updateUserApproval,
  getCampaigns,
  getBloodBag,
  getMessages,
  sendMessage,
  getSentMessages,
  deleteUser,
  getUserLocations,
  updatePassword,
  getuser
};
