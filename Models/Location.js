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
  name: {
    type: String,
    required: [true, "name not provided"],
  },
});

module.exports = {
  locationSchema,
};
