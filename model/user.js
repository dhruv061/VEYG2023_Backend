const mongoose = require("mongoose");

//schema of for degree and diploma users
const UserSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
    trim: true, //trim remove space in user input
  },
  email: {
    required: true,
    type: String,
    trim: true,
    validate: {
      validator: (val) => {
        const re =
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        return val.match(re);
      },
      message: "Please enter a valid email address",
    },
  },
  phoneno: {
    required: true,
    type: String,
    trim: true,
  },
  diplomaORdegree: {
    required: true,
    type: String,
    trim: true,
  },
  collagename: {
    required: true,
    type: String,
    trim: true,
  },
  branch: {
    required: true,
    type: String,
    trim: true,
  },
  sem: {
    required: true,
    type: String,
    trim: true,
  },
  password: {
    required: true,
    type: String,
    trim: true,
  },
});

//create Collection
const DegreeUsers = mongoose.model("DegreeUsers", UserSchema);
const DiplomaUsers = mongoose.model("DiplomaUsers", UserSchema);

module.exports = { DegreeUsers, DiplomaUsers };
