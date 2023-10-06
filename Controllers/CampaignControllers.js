const BloodBagModel = require("../Models/BloodBagModel");
const BloodContainerModel = require("../Models/BloodContainerModel");
const { CampaignModel } = require("../Models/CampaignModel");
const { DonationRequestModel } = require("../Models/DonationRequestModel");
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

const createCampaign = async (req, res) => {

  const { startTime, endTime, location, staff, donors, organizedBy } = req.body;

  console.log("campaign creating");

  const foundCampaign = await CampaignModel.findOne({
    $and: [
      { timeBegin: { $gte: new Date(startTime) } },
      { timeBegin: { $lte: new Date(endTime) } },
    ],  
  });

  let foundDonors = donors;

  if (!foundCampaign) {
    let assignedBloodBags = [];

    //creating blood bags for each user
    for (let currentDonor of foundDonors) {
      const foundRequest = await DonationRequestModel.findOneAndUpdate({$and:[{
        User: currentDonor._id,
      },{isAssigned:false}]},{isAssigned:true});

      let newBloodBag = new BloodBagModel({
        dateCreated: Date(),
        donor: currentDonor._id,
        capacity: 0,
        bloodType: currentDonor.bloodType,
        donationType: foundRequest.donationType,
        presevativesAdded: "",
      });

      assignedBloodBags.push(newBloodBag);

      try {
        await newBloodBag.save();
        //await DonationRequestModel.updateOne({_id:foundRequest._id},{isAssigned:true})
      } catch (error) {
        return res.status(500).json({ msg: error.message });
      }
    }

    const newBloodConatiner = new BloodContainerModel({
      bloodBags: assignedBloodBags,
    });

    try {
      await newBloodConatiner.save();
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }

    const newCampaign = new CampaignModel({
      location: location,
      timeBegin: startTime,
      timeEnd: endTime,
      donors: foundDonors,
      bloodContainer: newBloodConatiner,
    });

    newCampaign
      .save()
      .then((r) => {
        return res.status(201).json({ msg: "campaign created" });
      })
      .catch((error) => {
        return res.status(500).json({ msg: "campaign created" });
      });
  } else {
    return res.status(409).json({ msg: "a campaign is already assigned" });
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

const findPendingCampaigns = async (req, res) => {
  const { startTime, endTime } = req.query;

  let foundCampaigns = [];

  const st = !startTime ? new Date() : new Date(startTime);
  const et = !endTime ? new Date() : new Date(endTime);

  console.log(st);
  console.log(et);

  if (startTime && endTime) {
    try {
      foundCampaigns = await CampaignModel.find({
        $and: [
          { timeBegin: { $gte: st } },
          { timeEnd: { $lte: et } },
          { isCompleted: false },
          {isCancelled:false}
        ],
      });

    } catch (error) {
  
    }
  } else {
    foundCampaigns = await CampaignModel.find({ isCompleted: false });
  }

  return res.status(200).json(foundCampaigns);
};

// returns the container
const getBloodContainer = async (campaign) => {
  const containerID = campaign.bloodContainer;

  const foundContainer = await BloodContainerModel.findOne({
    _id: containerID,
  });

  if (foundContainer) {
    return foundContainer;
  }

  return null;
};

//cancell campaign
const cancellCampaign = async (req, res) => {
  
  const { campaignID } = req.body;

  try{

  const foundCampaign = await CampaignModel.findOne({_id:campaignID});

  if(foundCampaign){

    const foundBloodContainer = await BloodContainerModel.findOne({_id:foundCampaign.bloodContainer})

    for(let currentbloodbag of foundBloodContainer.bloodBags){

      const foundBloodBag = await BloodBagModel.findOneAndUpdate({_id:currentbloodbag},{filled:true});
      
      console.log(foundBloodBag);
      
    }

  }

  await CampaignModel.findOneAndUpdate(
    { _id: campaignID },
    { isCancelled: true }
  );

  res.status(200).json({ msg: "campaign cancelled" });

}
catch(error){

  return res.status(500).json({msg:"cannot cancel the campaign"})
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

const updateBloodBag = async(req,res)=>{

  const{user,capacity} = req.body;

  try{

    await BloodBagModel.findOneAndUpdate({donor:user},{capacity:capacity})

    return res.status(200).json({msg:'capacity updated'});

  }catch(error){

    return res.status(500).json({msg:'failed to update blood bag'});
  }

}

const getCancelledCampaigns = async(req,res)=>{


  const foundCampaigns = await CampaignModel.find({isCancelled:true});


  return res.status(200).json({foundCampaigns})

}

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
  findDonorInCampaign,
  removeUsersFromCampaign,
  createCampaign,
  findPendingCampaigns,
  cancellCampaign,
  getCancelledCampaigns,
  updateBloodBag
};
