const BloodBagModel = require("../Models/BloodBagModel");
const { CampaignModel } = require("../Models/CampaignModel");
const { UserModel } = require("../Models/UserModel");

//adding a user model to the database
const addCampaign = async (req, res) => {
  const { location, timeBegin, staff, donors, bloodGroup } = req.body;

  console.log(email);

  try {
    var newCampaign = new CampaignModel({
      location: location,
      timeBegin: timeBegin,
      staff: staff,
      donors: donors,
      bloodGroup: bloodGroup,
    });
    const result = await newCampaign.save();
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const findAllCampaign = async (req, res, next) => {
  await CampaignModel.find({})
    .then((result) => {
      return res.status(201).json(result);
    })
    .atch((error) => {
      return res.status(500).json(error);
    });
};

const findCampaign = async (req, res, next) => {
  const { id, name } = req.body;

  await CampaignModel.findOne({ $or: [{ name: name }, { _id: id }] })
    .then((result) => {
      return res.status(201).json(result);
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
};

//asign donors to the campaigns
const assignDonorsToCampaigns = async (req, res, next) => {
  const { donors, location, organizedBy, endTime, startTime } = req.body;

  if (!location || !organizedBy || !endTime || !startTime) {
    return res.status(500).json({ msg: "missing required fields" });
  }

  if (donors.length > 0) {
    next();
  } else {
    return res
      .status(500)
      .json({ msg: "found empty donors cannot create a campaign" });
  }
};

const createDonatePool = async (req, res) => {
  const { donors, location, organizedBy, endTime, startTime } = req.body;

  let foundDonors = [];
  let bloodBags = [];

  // Find documents where any value in searchArray is included in donors
  UserModel.find({ myArray: { $in: searchArray } }, (err, results) => {
    if (err) {
      console.error(err);
      return;
    }

    foundDonors = results;

    // Check if the retrieved documents match the donors exactly
    const matchedDocuments = results.filter((doc) => {
      return searchArray.every((value) => doc.myArray.includes(value));
    });
  });

  if (matchedDocuments.length === searchArray.length) {
    console.log("Documents that match the searchArray exactly:");
    console.log(matchedDocuments);
  } else {
    console.log(
      "Not all values in the searchArray are found in the documents."
    );
    console.log("Matched Documents:");
    console.log(matchedDocuments);
    console.log("Missing Values:");
    const missingValues = searchArray.filter(
      (value) => !matchedDocuments.some((doc) => doc.myArray.includes(value))
    );
    console.log(missingValues);
  }

  for (let currentDonor of foundDonors) {
    let newBloodBag = new BloodBagModel({
      dateCreated: Date(),
      donor: currentDonor._id,
      capacity: 0,
      bloodType: currentDonor.bloodType,
      donationType: "",
      presevativesAdded: "",
    });
  }
};

//add donors to the campaign
const findDonorInCampaign = async (req, res, next) => {
  const { users } = req.body;

  let alreadyUsers = [];

  for (let current of users) {
    let founduser = await CampaignModel.findOne({
      $and: [{ donors: { $in: [current] } }, { isCompleted: false }],
    });

    if (founduser) {
      alreadyUsers.push(founduser);
    }
  }

  if (alreadyUsers.length > 0) {
    return res.status(500).json({
      msg: "someuser already in some campaigns",
      usersFound: alreadyUsers,
    });
  } else {
    req.body.donors = users;
    next();
  }
};

//removes donors from the campaign
const removeUsersFromCampaign = async (req, res) => {
  const { users, campaignID } = req.body;

  let removedUsers = [];

  let foundCampaign = await CampaignModel.findOne({ _id: campaignID });

  if (foundCampaign) {
    const currentdonors = foundCampaign.donors;
    let updatedDonors = currentdonors.filter((item) => !users.includes(item));

    CampaignModel.findOneAndUpdate(
      { _id: foundCampaign._id },
      { donor: updatedDonors }
    )
      .then((r) => {
        res.status(200).json({ updatedList: r.donors });
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  } else {
    return res.status(404).json({ msg: "couldnt find provided campaign id" });
  }
};

const updateCampaign = async (req, res, next) => {
  const {
    name,
    updatedBloodGroup,
    id,
    updatedName,
    updatedDonors,
    updatedStaff,
    bloodType,
  } = req.body;

  const errors = [];

  if (updatedName !== undefined) {
    await CampaignModel.findOneAndUpdate(
      { $or: [{ name: name }, { _id: id }] },
      { name: updatedName }
    )
      .then((result) => {})
      .catch((err) => {
        errors.push("invalid name");
      });
  }
  if (updatedDonors !== undefined) {
    await CampaignModel.findOneAndUpdate(
      { $or: [{ name: name }, { _id: id }] },
      { Donors: updatedDonors }
    )
      .then((result) => {})
      .catch((err) => {
        errors.push("invalid donors array input");
      });
  }
  if (updatedStaff !== undefined) {
    await CampaignModel.findOneAndUpdate(
      { $or: [{ name: name }, { _id: id }] },
      { Donors: updatedStaff }
    )
      .then((result) => {})
      .catch((err) => {
        errors.push("invalid staff array input");
      });
  }

  if (updatedBloodGroup !== undefined) {
    await CampaignModel.findOneAndUpdate(
      { $or: [{ name: name }, { _id: id }] },
      { bloodGroup: updatedBloodGroup }
    )
      .then((result) => {})
      .catch((err) => {
        errors.push("invalid aray of blood group");
      });
  }
  if (errors.length == 3) {
    return res.status(500).json(errors);
  }

  return res.status(201).json(errors);
};

module.exports = {
  addCampaign,
  updateCampaign,
  findAllCampaign,
  findCampaign,
  findDonorInCampaign,
  removeUsersFromCampaign,
};
