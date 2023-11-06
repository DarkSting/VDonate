const { ComplainModel } = require("../Models/ComplainModel");
const { UserModel } = require("../Models/UserModel");

//adding a user model to the database
const addComplain = async (req, res) => {
  const { User, checkedBy, description, refNo } = req.body;

  try {
    var newComplain = new ComplainModel({
      User: User,
      checkedBy: checkedBy,
      description: description,
      refNo: refNo,
    });

    const result = await newComplain.save();
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const findAllComplains = async (req, res, next) => {
  let foundComplains = [];

  try {
    const result = await ComplainModel.find({ checked: false });

    for (let currentUser of result) {
      let foundUser = await UserModel.findOne({ _id: currentUser.User });

      console.log(foundUser);

      if (foundUser) {
        let obj = {};
        obj.sender = foundUser.email;
        obj.description = currentUser.description;
        obj._id = currentUser._id;
        foundComplains.push(obj);
      }
    }

    return res.status(200).json(foundComplains);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const setComplainWatched = async (req, res) => {
  const { complainID } = req.body;

  console.log(complainID);

  try {
    await ComplainModel.findOneAndUpdate(
      { _id: complainID },
      { checked: true }
    );

    return res.status(201).json({ msg: "complaint checked" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const findComplain = async (req, res, next) => {
  const { checkedBy, refNo } = req.body;

  await ComplainModel.findOne({
    $or: [{ refNo: refNo }, { checkedBy: checkedBy }],
  })
    .then((result) => {
      return res.status(201).json(result);
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
};

const updateComplain = async (req, res, next) => {
  const { checkedBy, refNo, updatedDes } = req.body;

  const errors = [];

  if (updatedDes !== undefined) {
    console.log(updatedName);
    await ComplainModel.findOneAndUpdate(
      { $or: [{ refNo: refNo }, { checkedBy: checkedBy }] },
      { description: updatedDes }
    )
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        return res.status(201).json(err.message);
      });
  }
};

module.exports = {
  addComplain,
  updateComplain,
  findAllComplains,
  findComplain,
  setComplainWatched,
};
