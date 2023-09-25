const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  latitude: {
    type: String,
    require: [true, "latitude required"],
  },
  longitude: {
    type: String,
    require: [true, "longitude required"],
  },
});

module.exports = {
  locationSchema,
};
