const mongoose = require("mongoose");

const CampaignSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  organizedBy: {
    type: String,
  },
  timeBegin: {
    type: Date,
    required: [true, "begin time required"],
  },

  StaffGroup: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "adminmodels",
    },
  ],
  isCancelled: {
    type: Boolean,
    default: false,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  timeEnd: {
    type: Date,
    required: [true, "end time required"],
  },
  donors: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "usermodels",
    },
  ],
  bloodContainer: {
    type: mongoose.Schema.ObjectId,
    ref: "bloodBagmodels",
  },
});

const CampaignModel = mongoose.model("CampaignModel", CampaignSchema);

module.exports = { CampaignModel };
