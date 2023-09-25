const { ComplainModel } = require("../Models/ComplainModel");

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
  await ComplainModel.find({})
    .then((result) => {
      return res.status(201).json(result);
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
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
};
