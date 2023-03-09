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

//schema for games
const participatedSchema = mongoose.Schema({
  //for transaction
  transactionid: {
    required: true,
    type: String,
    trim: true, //trim remove space in user input
  },

  //for time
  timeDate: {
    required: true,
    type: String,
    trim: true,
  },

  //for player-1
  leadername: {
    required: true,
    type: String,
    trim: true, //trim remove space in user input
  },

  leaderemail: {
    required: true,
    type: String,
    trim: true, //trim remove space in user input
  },

  leadercollgename: {
    required: true,
    type: String,
    trim: true, //trim remove space in user input
  },

  leaderenrollmentNo: {
    required: true,
    type: String,
    trim: true, //trim remove space in user input
  },

  //for player-2
  player2name: {
    type: String,
    trim: true, //trim remove space in user input
  },
  player2email: {
    type: String,
    trim: true, //trim remove space in user input
  },
  player2collgename: {
    type: String,
    trim: true, //trim remove space in user input
  },
  player2enrollmentNo: {
    type: String,
    trim: true, //trim remove space in user input
  },

  //for player-3
  player3name: {
    type: String,
    trim: true, //trim remove space in user input
  },
  player3email: {
    type: String,
    trim: true, //trim remove space in user input
  },
  player3collgename: {
    type: String,
    trim: true, //trim remove space in user input
  },
  player3enrollmentNo: {
    type: String,
    trim: true, //trim remove space in user input
  },

  //for player-4
  player4name: {
    type: String,
    trim: true, //trim remove space in user input
  },
  player4email: {
    type: String,
    trim: true, //trim remove space in user input
  },
  player4collgename: {
    type: String,
    trim: true, //trim remove space in user input
  },
  player4enrollmentNo: {
    type: String,
    trim: true, //trim remove space in user input
  },

  //for player-5
  player5name: {
    type: String,
    trim: true, //trim remove space in user input
  },
  player5email: {
    type: String,
    trim: true, //trim remove space in user input
  },
  player5collgename: {
    type: String,
    trim: true, //trim remove space in user input
  },
  player5enrollmentNo: {
    type: String,
    trim: true, //trim remove space in user input
  },
});

//schma for payments
const paymentsSchema = mongoose.Schema({
  userId: {
    required: true,
    type: String,
    trim: true,
  },
  paymentId: {
    required: true,
    type: String,
    trim: true,
  },
  amount: {
    required: true,
    type: String,
    trim: true,
  },
  //for time
  timeDate: {
    required: true,
    type: String,
    trim: true,
  },
  gam1Name: {
    type: String,
    trim: true,
  },
  gam2Name: {
    type: String,
    trim: true,
  },
  gam3Name: {
    type: String,
    trim: true,
  },
  gam4Name: {
    type: String,
    trim: true,
  },
  gam5Name: {
    type: String,
    trim: true,
  },
});

//create Collection for User
const DegreeUsers = mongoose.model("DegreeUsers", UserSchema);
const DiplomaUsers = mongoose.model("DiplomaUsers", UserSchema);

//create Collection for Participated
const Techtaimnet = mongoose.model("TechTainment", participatedSchema);
const Talaash = mongoose.model(
  "Talaash-The technical Treasure hunt",
  participatedSchema
);
const Dekathon = mongoose.model("Dekathon", participatedSchema);

//collection for payments
const Payments = mongoose.model("Payments", paymentsSchema);

module.exports = {
  DegreeUsers,
  DiplomaUsers,
  Payments,
  Techtaimnet,
  Talaash,
  Dekathon,
};
