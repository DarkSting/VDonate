const { AdminModel } = require("../Models/AdminModel");
const { UserModel } = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const { sendmailInternal } = require("./MailControllers");
const jwt = require("jsonwebtoken");
const { createToken } = require("../Middlewares/authMiddleware");
const { MessageModel } = require("../Models/UserMessageModel");
const { default: mongoose } = require("mongoose");

//check the the admin login
const welcomeAdmin = (req, res) => {
  const token = req.cookies.jwt;

  console.log(token);

  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        console.log(err.message);
        res.status(500).json("invalid token");
      } else {
        AdminModel.findOne({ _id: decoded.id })
          .then((r) => {
            if (r.isActive) {
              return res.status(200).json({ name: r.userName, id: r._id });
            }

            return res.status(500).json({ name: r.userName });
          })
          .catch((er) => {
            return res.status(404).json({ msg: "user not found", code: 500 });
          });
      }
    });
  } else {
    return res.status(404).json({ msg: "token not found", code: 500 });
  }
};

const sendMessage = async (req, res) => {
  const { user, description, receiver } = req.body;

  try {
    const foundUser = await AdminModel.findOne({ userName: user });

    const foundReceiver = await UserModel.findOne({ userName: receiver });

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

//adding a user model to the database
const addAdmin = async (req, res) => {
  const {
    name,
    age,
    nic,
    gender,
    email,
    phone,
    bloodType,
    photo,
    licenseNumber,
    role,
  } = req.body;

  if (!name || !age || !nic || !email || !phone || !licenseNumber) {
    return res.status(500).json({ msg: "provide necessary details" });
  }

  try {
    const newAdmin = new AdminModel({
      userName: name,
      email: email,
      phone: phone,
      age: age,
      nic: nic,
      licenseNumber: licenseNumber,
      role: role,
    });
    
    const result = await newAdmin.save();
    return res.status(201).json(result);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message, code: 11000 });
  }
};

/**GET
 *
 * loggin Admin
 */
const loginAdmin = async (req, res) => {
  const { licenseNumber, password } = req.body;

  try {
    const user = await AdminModel.login(licenseNumber, password);

    if (user) {
      if (user.isActive) {
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true });
        return res.status(200).json(user);
      } else {
        return res
          .status(500)
          .json({ msg: "please complete the registration process" });
      }
    } else {
      return res.status(500).json({ msg: "incorrect credintials" });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};


const updatePassword = async (req, res) => {
  const { oldPassword, newPassword, user } = req.body;

  console.log(oldPassword);
  console.log(newPassword);

  let foundUser = await AdminModel.findOne({ _id: user._id });

  const auth = await bcrypt.compare(oldPassword, foundUser.password.trim());

  console.log(auth);

  if (auth && foundUser) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPassword.trim(), salt);

    foundUser.password = hashedPassword;

    console.log(auth);

    await AdminModel.findOneAndUpdate(
      { _id: user._id },
      { password: hashedPassword }
    );

    return res.status(200).json({ msg: "Password updated" });
  }

  return res.status(500).json({ msg: "Password update failed" });
};

const updatePasswordAdmin = async (req, res) => {
  const { password, usermail, approval } = req.body;

  //check whether the mail is provided
  if (!usermail) {
    res.status(404).json({ msg: "please provide the mail" });
  }

  //preparing the mail components
  const subject = "Request approved";
  const title = "Your new password";
  let intro = "";
  const buttontxt = "";
  const instructions = "Thank you for joining with us";

  //hashing the password
  const salt = await bcrypt.genSalt();

  let newpass = "";

  function generatePass() {
    let pass = "";
    let str =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz0123456789@#$";

    for (let i = 1; i <= 5; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }
    return pass;
  }

  const foundUser = await AdminModel.findOne({ email: usermail });

  console.log(foundUser);

  //check whether the user is available
  if (foundUser) {
    //check whether the user is provided the password if not generate the password automatically
    if (!foundUser.isActive && approval) {
      let userpass = generatePass();
      newpass = await bcrypt.hash(userpass, salt);

      console.log(userpass);
      intro = `<p>your new password is <b>${userpass}</b></p>`;

      //sending the mail
      const mailsent = sendmailInternal(
        usermail,
        subject,
        title,
        intro,
        buttontxt,
        instructions
      );

      //check whether mail is sent or not
      if (!mailsent) {
        console.log("mail sent");
        await AdminModel.findOneAndUpdate(
          { email: usermail },
          { $set: { password: newpass, isActive: true } }
        )
          .then((r) => {
            return res.status(200).json({ msg: "password updated" });
          })
          .catch((error) => {
            return res.status(500).json({ msg: error.message });
          });
      } else {
        return res.status(500).json({ msg: "unable to send the mail" });
      }
    } else if (foundUser.isActive) {
      newpass = await bcrypt.hash(password, salt);
      await AdminModel.findOneAndUpdate(
        { email: usermail },
        { password: newpass }
      )
        .then((r) => {
          return res.status(200).json({ msg: "password updated" });
        })
        .catch((error) => {
          return res.status(500).json({ msg: error.message });
        });
    } else {
      return res.status(500).json({ msg: "Profile is deactivated" });
    }
  } else {
    return res.status(404).json({ msg: "unable to find the user" });
  }
};

const updatePasswordUser = async (objectId, password) => {
  //check whether the mail is provided
  if (!objectId) {
    return false;
  }

  //preparing the mail components
  const subject = "You signup has been approved";
  const title = "Your new password";
  let intro = "";
  const buttontxt = "";
  const instructions = "Thank you for joining with us";

  //hashing the password
  const salt = await bcrypt.genSalt();

  let newpass = "";

  function generatePass() {
    let pass = "";
    let str =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz0123456789@#$";

    for (let i = 1; i <= 5; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }
    return pass;
  }

  const foundUser = await UserModel.findOne({ _id: objectId });

  //check whether the user is available
  if (foundUser) {
    //check whether the user is provided the password if not generate the password automatically
    if (!password) {
      let userpass = generatePass();
      newpass = await bcrypt.hash(userpass, salt);

      console.log(userpass);
      intro = `<p>your new password is <b>${userpass}</b></p>`;

      //sending the mail
      const mailsent = sendmailInternal(
        foundUser.email,
        subject,
        title,
        intro,
        buttontxt,
        instructions
      );

      //check whether mail is sent or not
      if (mailsent) {
        const status = await UserModel.findOneAndUpdate(
          { email: foundUser.email },
          { password: newpass }
        )
          .then((r) => {
            console.log(r);

            return true;
          })
          .catch((error) => {
            console.log(error);
            return false;
          });

        return status;
      } else {
        return false;
      }
    } else {
      newpass = await bcrypt.hash(password, salt);
      const status = await UserModel.findOneAndUpdate({
        email: foundUser.email,
      })({ password: password })
        .then((r) => {
          return true;
        })
        .catch((error) => {
          return false;
        });

      return status;
    }
  } else {
    return false;
  }
};

const getNewlySignedAdmins = async (req, res) => {
  const foundAdmins = await AdminModel.find({
    $and: [{ isActive: false }, { age: { $gt: 18 } }],
  });

  if (foundAdmins.length > 0) {
    return res.status(200).json(foundAdmins);
  } else {
    return res.status(500).json(foundAdmins);
  }
};

const rejectAdminSignUp = async (req, res) => {
  const { userID } = req.body;

  try {
    console.log(userID);
    const foundAdmins = await AdminModel.findOneAndUpdate(
      { _id: userID },
      { age: 0 }
    );

    return res.status(200).json({ msg: "rejected" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getYetToValidateUsers = (req, res) => {
  UserModel.find({ isValidated: false })
    .then((r) => {
      let array = [];

      r.forEach((value) => {
        let cObj = {};
        cObj.name = value.userName;
        cObj.phone = value.phone;
        cObj.id = value.nic;
        cObj.objectId = value._id;
        cObj.email = value.email;
        array.push(cObj);
      });

      res.status(200).json(array);
    })
    .catch((err) => {
      res.status(500).json({ msg: "no user to find", code: 500 });
    });
};

//controller that will be invoked after existing admin gives the approve to
//the new admin
const confirmAdmin = async (req, res) => {
  const { role, qualifications, yrExp, nic, phone } = req.body;

  await AdminModel.findOneAndUpdate(
    { $or: [{ nic: nic }, { phone: phone }] },
    { role: role, qualifications: qualifications, yearOfEXp: yrExp }
  )
    .then((res) => {
      return res.status(200).json(res);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

const getMessages = async (req, res) => {
  const { user } = req.body;

  const foundMessages = await MessageModel.find({
    receiver: new mongoose.Types.ObjectId(user),
  });

  if (foundMessages.length > 0) {
    return res.status(200).json({ foundMessages });
  } else {
    return res.status(500).json({ msg: "no messages found" });
  }
};

const findAllAdmins = async (req, res, next) => {
  await AdminModel.find({})
    .then((result) => {
      return res.status(201).json(result);
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
};

const findAdmin = async (req, res) => {
  const { user } = req.body;

      user.password = null;

      return res.status(201).json(user);
   
};

const updateAdmin = async (req, res, next) => {
  const {

    nic,
    email,
    phone,
    user
  } = req.body;

  
  console.log(user);

    await AdminModel.findOneAndUpdate(
      { _id:user._id},
      { nic:nic ,phone:phone,email:email }
    )
      .then((result) => {
        return res.status(201).json({msg:"ok"});
      })
      .catch((err) => {
        return res.status(500).json({msg:"error"});
      });
  

};

module.exports = {
  addAdmin,
  updateAdmin,
  findAllAdmins,
  findAdmin,
  confirmAdmin,
  getYetToValidateUsers,
  loginAdmin,
  updatePasswordAdmin,
  welcomeAdmin,
  getNewlySignedAdmins,
  updatePasswordUser,
  rejectAdminSignUp,
  getMessages,
  sendMessage,
  updatePassword
};
