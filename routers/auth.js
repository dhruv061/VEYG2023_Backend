const express = require("express");

//for call schema with model
const {
  DegreeUsers,
  DiplomaUsers,
  DegreePayments,
  Techtaimnet,
  Talaash,
  theCivilSafari,
  Dekathon,
  offilceTennis,
} = require("../model/user");

const authorRouter = express.Router();
//for paswword compare || store hash password
const bcryptjs = require("bcryptjs");

//for signin
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");

// SIGN-UP API for Degree
authorRouter.post("/api/Degree/signup", async (req, res) => {
  try {
    //-->get the data from the client
    const {
      name,
      email,
      phoneno,
      diplomaORdegree,
      collagename,
      branch,
      sem,
      EnNO,
      password,
    } = req.body;

    //check if user exits or not
    const existinguser = await DegreeUsers.findOne({ email });
    if (existinguser) {
      return res
        .status(400)
        .json({ msg: "User with same email alredy exits!" });
    }

    //here 8 is solt --> 8 charcter password
    const hashPassword = await bcryptjs.hash(password, 8);

    let degreeUser = new DegreeUsers({
      name,
      email,
      phoneno,
      diplomaORdegree,
      collagename,
      branch,
      sem,
      EnNO,
      password: hashPassword,
    });

    degreeUser = await degreeUser.save();
    res.status(201).send(degreeUser);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// SIGN-UP API for Diploma
authorRouter.post("/api/Diploma/signup", async (req, res) => {
  try {
    //-->get the data from the client
    const {
      name,
      email,
      phoneno,
      diplomaORdegree,
      collagename,
      branch,
      sem,
      EnNO,
      password,
    } = req.body;

    //check if user exits or not
    const existinguser = await DiplomaUsers.findOne({ email });
    if (existinguser) {
      return res
        .status(400)
        .json({ msg: "User with same email alredy exits!" });
    }

    //here 8 is solt --> 8 charcter password
    const hashPassword = await bcryptjs.hash(password, 8);

    let diplomaUser = new DiplomaUsers({
      name,
      email,
      phoneno,
      diplomaORdegree,
      collagename,
      branch,
      sem,
      EnNO,
      password: hashPassword,
    });

    diplomaUser = await diplomaUser.save();
    res.status(201).send(diplomaUser);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//Sign-In API for Degree
authorRouter.post("/api/Degree/signin", async (req, res) => {
  try {
    //get data from client
    const { email, password } = req.body;

    //check if user exits or not
    const user = await DegreeUsers.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "User with this email does not exist!" });
    }

    //check password match
    const ispasswordMatch = await bcryptjs.compare(password, user.password);
    if (!ispasswordMatch) {
      return res.status(400).json({ msg: "Password is Invalid" });
    }

    //JWT token for signin
    const token = jwt.sign({ id: user._id }, "passwordKey");

    res.json({ token, ...user._doc });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//Sign-In API for Degree
authorRouter.post("/api/Diploma/sigin", async (req, res) => {
  try {
    //get data from client
    const { email, password } = req.body;

    //check if user exits or not
    const user = await DiplomaUsers.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "User with this email does not exist!" });
    }

    //check password match
    const ispasswordMatch = await bcryptjs.compare(password, user.password);
    if (!ispasswordMatch) {
      return res.status(400).json({ msg: "Password is Invalid" });
    }

    //JWT token for signin
    const token = jwt.sign({ id: user._id }, "passwordKey");

    res.json({ token, ...user._doc });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//Token Verified API
authorRouter.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.json(false);
    }

    const verified = jwt.verify(token, "passwordKey");
    if (!verified) {
      return res.json(false);
    }

    const user = await User.findById(verified.id);
    if (!user) {
      return res.json(false);
    }

    res.json(true);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//get user Data API
//auth is middle ware

//for Degree
authorRouter.get("/api/Degree/GetUserData", auth, async (req, res) => {
  const user = await DegreeUsers.findById(req.user);
  res.json({ ...user._doc, token: req.token });
});
//for Diploma
authorRouter.get("/api/Diploma/GetUserData", auth, async (req, res) => {
  const user = await DiplomaUsers.findById(req.user);
  res.json({ ...user._doc, token: req.token });
});

// ****************************************************************************************//
//Store payments --> that selp to showing payment history
authorRouter.post("/Degree/payments/add", async (req, res) => {
  try {
    // --> get data from the client
    const {
      userId,
      paymentId,
      amount,
      timeDate,
      GameTalaash,
      GameTechTainment,
      GameTheCivilSafari,
      GameDekathon,
      GameOfficeTennis,
      playername,
      playeremail,
      playercollgename,
      playerenrollmentNo,
      playerContectNo,
    } = req.body;

    let payment = new DegreePayments({
      userId,
      paymentId,
      amount,
      timeDate,
      GameTalaash,
      GameTechTainment,
      GameTheCivilSafari,
      GameDekathon,
      GameOfficeTennis,
      playername,
      playeremail,
      playercollgename,
      playerenrollmentNo,
      playerContectNo,
    });

    payment = await payment.save();
    res.status(201).send(payment);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//get payment History of particluar user
authorRouter.get("/Degree/payments/:userId", async (req, res) => {
  const userId = req.params.userId;
  // const payments = await db.collection("Payments").find({ userId }).toArray();
  const payments = await DegreePayments.find({ userId });
  res.json(payments);
});

// ****************************************************************************************//
//when user participated then store user detail in particluar game

//For Deggree
//for techtainment
authorRouter.post("/api/Degree/Games/Techtaimnet", async (req, res) => {
  try {
    //-->get the data from the client
    const {
      transactionid,
      timeDate,
      leadername,
      leaderemail,
      leadercollgename,
      leaderenrollmentNo,
      leaderSem,
      leaderBranch,
      leaderContactNo,
      player2name,
      player2email,
      player2collgename,
      player2enrollmentNo,
      player2Sem,
      player2Branch,
      player2ContactNo,
      player3name,
      player3email,
      player3collgename,
      player3enrollmentNo,
      player3Sem,
      player3Branch,
      player3ContactNo,
    } = req.body;

    let techtaimentUser = new Techtaimnet({
      transactionid,
      timeDate,
      leadername,
      leaderemail,
      leadercollgename,
      leaderenrollmentNo,
      leaderSem,
      leaderBranch,
      leaderContactNo,
      player2name,
      player2email,
      player2collgename,
      player2enrollmentNo,
      player2Sem,
      player2Branch,
      player2ContactNo,
      player3name,
      player3email,
      player3collgename,
      player3enrollmentNo,
      player3Sem,
      player3Branch,
      player3ContactNo,
    });

    techtaimentUser = await techtaimentUser.save();
    res.status(201).send(techtaimentUser);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//for Talaash
authorRouter.post("/api/Degree/Games/Talaash", async (req, res) => {
  try {
    //-->get the data from the client
    const {
      transactionid,
      timeDate,
      leadername,
      leaderemail,
      leadercollgename,
      leaderenrollmentNo,
      leaderSem,
      leaderBranch,
      leaderContactNo,
      player2name,
      player2email,
      player2collgename,
      player2enrollmentNo,
      player2Sem,
      player2Branch,
      player2ContactNo,
    } = req.body;

    let talaashUser = new Talaash({
      transactionid,
      timeDate,
      leadername,
      leaderemail,
      leadercollgename,
      leaderenrollmentNo,
      leaderSem,
      leaderBranch,
      leaderContactNo,
      player2name,
      player2email,
      player2collgename,
      player2enrollmentNo,
      player2Sem,
      player2Branch,
      player2ContactNo,
    });

    talaashUser = await talaashUser.save();
    res.status(201).send(talaashUser);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//for the Civil Safari
authorRouter.post("/api/Degree/Games/TheCivilSafari", async (req, res) => {
  try {
    //-->get the data from the client
    const {
      transactionid,
      timeDate,
      leadername,
      leaderemail,
      leadercollgename,
      leaderenrollmentNo,
      leaderSem,
      leaderBranch,
      leaderContactNo,
      player2name,
      player2email,
      player2collgename,
      player2enrollmentNo,
      player2Sem,
      player2Branch,
      player2ContactNo,
      player3name,
      player3email,
      player3collgename,
      player3enrollmentNo,
      player3Sem,
      player3Branch,
      player3ContactNo,
    } = req.body;

    let theCivilSafariUser = new theCivilSafari({
      transactionid,
      timeDate,
      leadername,
      leaderemail,
      leadercollgename,
      leaderenrollmentNo,
      leaderSem,
      leaderBranch,
      leaderContactNo,
      player2name,
      player2email,
      player2collgename,
      player2enrollmentNo,
      player2Sem,
      player2Branch,
      player2ContactNo,
      player3name,
      player3email,
      player3collgename,
      player3enrollmentNo,
      player3Sem,
      player3Branch,
      player3ContactNo,
    });

    theCivilSafariUser = await theCivilSafariUser.save();
    res.status(201).send(theCivilSafariUser);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//for Dekathon
authorRouter.post("/api/Degree/Games/Dekathon", async (req, res) => {
  try {
    //-->get the data from the client
    const {
      transactionid,
      timeDate,
      leadername,
      leaderemail,
      leadercollgename,
      leaderenrollmentNo,
      leaderSem,
      leaderBranch,
      leaderContactNo,
      player2name,
      player2email,
      player2collgename,
      player2enrollmentNo,
      player2Sem,
      player2Branch,
      player2ContactNo,
      player3name,
      player3email,
      player3collgename,
      player3enrollmentNo,
      player3Sem,
      player3Branch,
      player3ContactNo,
      player4name,
      player4email,
      player4collgename,
      player4enrollmentNo,
      player4Sem,
      player4Branch,
      player4ContactNo,
    } = req.body;

    let dekathonUser = new Dekathon({
      transactionid,
      timeDate,
      leadername,
      leaderemail,
      leadercollgename,
      leaderenrollmentNo,
      leaderSem,
      leaderBranch,
      leaderContactNo,
      player2name,
      player2email,
      player2collgename,
      player2enrollmentNo,
      player2Sem,
      player2Branch,
      player2ContactNo,
      player3name,
      player3email,
      player3collgename,
      player3enrollmentNo,
      player3Sem,
      player3Branch,
      player3ContactNo,
      player4name,
      player4email,
      player4collgename,
      player4enrollmentNo,
      player4Sem,
      player4Branch,
      player4ContactNo,
    });

    dekathonUser = await dekathonUser.save();
    res.status(201).send(dekathonUser);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//for ofice Tennis
authorRouter.post("/api/Degree/Games/OfficeTenis", async (req, res) => {
  try {
    //-->get the data from the client
    const {
      transactionid,
      timeDate,
      leadername,
      leaderemail,
      leadercollgename,
      leaderenrollmentNo,
      leaderSem,
      leaderBranch,
      leaderContactNo,
      player2name,
      player2email,
      player2collgename,
      player2enrollmentNo,
      player2Sem,
      player2Branch,
      player2ContactNo,
    } = req.body;

    let offilceTennisUser = new offilceTennis({
      transactionid,
      timeDate,
      leadername,
      leaderemail,
      leadercollgename,
      leaderenrollmentNo,
      leaderSem,
      leaderBranch,
      leaderContactNo,
      player2name,
      player2email,
      player2collgename,
      player2enrollmentNo,
      player2Sem,
      player2Branch,
      player2ContactNo,
    });

    offilceTennisUser = await offilceTennisUser.save();
    res.status(201).send(offilceTennisUser);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = authorRouter;
