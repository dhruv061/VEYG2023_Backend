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
  EnNO: {
    required: true,
    type: String,
    trim: true,
  },
  visiblepassword: {
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
  cuponCode: {
    required: true,
    type: String,
    trim: true,
  },

  paymentStatus: {
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

  leaderSem: {
    required: true,
    type: String,
    trim: true, //trim remove space in user input
  },
  leaderBranch: {
    required: true,
    type: String,
    trim: true, //trim remove space in user input
  },
  leaderContactNo: {
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
  player2Sem: {
    type: String,
    trim: true, //trim remove space in user input
  },
  player2Branch: {
    type: String,
    trim: true, //trim remove space in user input
  },
  player2ContactNo: {
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
  player3Sem: {
    type: String,
    trim: true, //trim remove space in user input
  },
  player3Branch: {
    type: String,
    trim: true, //trim remove space in user input
  },
  player3ContactNo: {
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
  player4Sem: {
    type: String,
    trim: true, //trim remove space in user input
  },
  player4Branch: {
    type: String,
    trim: true, //trim remove space in user input
  },
  player4ContactNo: {
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
  player5Sem: {
    type: String,
    trim: true, //trim remove space in user input
  },
  player5Branch: {
    type: String,
    trim: true, //trim remove space in user input
  },
  player5ContactNo: {
    type: String,
    trim: true, //trim remove space in user input
  },
});

//schma for Degree payments
const DegreepaymentsSchema = mongoose.Schema({
  userId: {
    required: true,
    type: String,
    trim: true,
  },
  cuponCode: {
    required: true,
    type: String,
    trim: true,
  },
  paymentStatus: {
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

  //for games
  GameTalaash: {
    type: String,
    trim: true,
  },
  GameTechTainment: {
    type: String,
    trim: true,
  },
  GameTheCivilSafari: {
    type: String,
    trim: true,
  },
  GameDekathon: {
    type: String,
    trim: true,
  },
  GameOfficeTennis: {
    type: String,
    trim: true,
  },

  //for player Details
  playername: {
    required: true,
    type: String,
    trim: true, //trim remove space in user input
  },
  playeremail: {
    required: true,
    type: String,
    trim: true, //trim remove space in user input
  },
  playercollgename: {
    required: true,
    type: String,
    trim: true, //trim remove space in user input
  },
  playerenrollmentNo: {
    required: true,
    type: String,
    trim: true, //trim remove space in user input
  },
  playerContectNo: {
    required: true,
    type: String,
    trim: true, //trim remove space in user input
  },
});

//schma for Degree payments
const DiplomapaymentsSchema = mongoose.Schema({
  userId: {
    required: true,
    type: String,
    trim: true,
  },
  cuponCode: {
    required: true,
    type: String,
    trim: true,
  },
  paymentStatus: {
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

  //for games
  GameProjectExpo: {
    type: String,
    trim: true,
  },
  GamePosterTalk: {
    type: String,
    trim: true,
  },
  GameTechnoSketch: {
    type: String,
    trim: true,
  },
  GameSharkTank: {
    type: String,
    trim: true,
  },
  GameGullyCricket: {
    type: String,
    trim: true,
  },
  GameVadicMaths: {
    type: String,
    trim: true,
  },
  GameOneMinuteGame: {
    type: String,
    trim: true,
  },
  GameTechOModel: {
    type: String,
    trim: true,
  },
  GameMultimediaPrse: {
    type: String,
    trim: true,
  },

  //for player Details
  playername: {
    required: true,
    type: String,
    trim: true, //trim remove space in user input
  },
  playeremail: {
    required: true,
    type: String,
    trim: true, //trim remove space in user input
  },
  playercollgename: {
    required: true,
    type: String,
    trim: true, //trim remove space in user input
  },
  playerenrollmentNo: {
    required: true,
    type: String,
    trim: true, //trim remove space in user input
  },
  playerContectNo: {
    required: true,
    type: String,
    trim: true, //trim remove space in user input
  },
});

//*********************************************************************************************************/
//create Collection for User
const DegreeUsers = mongoose.model("DegreeUsers", UserSchema);
const DiplomaUsers = mongoose.model("DiplomaUsers", UserSchema);

//********************************************************/
//Degree Games Models
//for each Game Collection
//create Collection for Participated
const Techtaimnet = mongoose.model("Tech-Tainment", participatedSchema);
const Talaash = mongoose.model(
  "Talaash-The technical Treasure hunt",
  participatedSchema
);
const theCivilSafari = mongoose.model("The Civil Safari", participatedSchema);

const Dekathon = mongoose.model("Dekathon", participatedSchema);

const offilceTennis = mongoose.model("Office Tennis", participatedSchema);

//********************************************************/
//Diploma Games Models
const ProjectExpo = mongoose.model("Project Expo", participatedSchema);
const PosterTalk = mongoose.model("Poster Talk", participatedSchema);
const TechnoSketch = mongoose.model("Techno Sketch", participatedSchema);
const SharkTank = mongoose.model("Shark Tank", participatedSchema);
const GullyCricket = mongoose.model("Gully Cricket", participatedSchema);
const VadicMaths = mongoose.model("Vadic Maths", participatedSchema);
const OneMinuteGame = mongoose.model("One Minute Game", participatedSchema);
const TechOModel = mongoose.model("Tech-O-Model", participatedSchema);
const MultimediaPrse = mongoose.model("MultimediaPrse", participatedSchema);

//********************************************************/
//collection for payments
const DegreePayments = mongoose.model("Degree Payments", DegreepaymentsSchema);
const DiplomaPayments = mongoose.model(
  "Diploma Payments",
  DiplomapaymentsSchema
);

module.exports = {
  DegreeUsers,
  DiplomaUsers,
  DegreePayments,
  Techtaimnet,
  Talaash,
  theCivilSafari,
  Dekathon,
  offilceTennis,
  ProjectExpo,
  PosterTalk,
  TechnoSketch,
  SharkTank,
  GullyCricket,
  VadicMaths,
  OneMinuteGame,
  TechOModel,
  MultimediaPrse,
  DiplomaPayments,
};
