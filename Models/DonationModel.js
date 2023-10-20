const mongoose = require("mongoose");

const DonationSchema = new mongoose.Schema({
  donationType: {
    type: String,
    required: true,
    enum: ["plasma", "plattlates", "WholeBlood", "PowerRed"],
  },
  refNo: {
    type: String,
    unique: true,
    required: true,
  },

  donationId: Number,
  quantity: Number,
  timeTakenForProcess: {
    type: Number,
    required: true,
  },
  isValidated: {
    type: Boolean,
    default: false,
  },
  collectedAt: {
    type: Date,
    default: Date.now,
  },

  bloodType: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        const bloodTypeRegex = /^(A|B|AB|O)[+-]$/;
        return bloodTypeRegex.test(value);
      },
      message: "Please enter a valid blood type",
    },
  },
  Staff: {
    type: String,
    required: true,
    ref: "AdminModel",
  },
});

const DonationModel = mongoose.model("DonationModel", DonationSchema);

module.exports = {
  DonationModel,
  DonationSchema,
};
