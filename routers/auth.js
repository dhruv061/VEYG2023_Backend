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

//For Degree Students
//Store payments --> that selp to showing payment history
authorRouter.post("/Degree/payments/add", async (req, res) => {
  try {
    // --> get data from the client
    const {
      userId,
      cuponCode,
      paymentStatus,
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
      cuponCode,
      paymentStatus,
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

//Get Payment Details Using Coupen Code --> Show Payment and all other details to ADMIN
authorRouter.get(
  "/Degree/PaymentDetailsForAdmin/:cuponCode",
  async (req, res) => {
    const cuponCode = req.params.cuponCode;
    // const payments = await db.collection("Payments").find({ userId }).toArray();
    const payments = await DegreePayments.find({ cuponCode });
    res.json(payments);
  }
);

//Update Payment Status Using Coupn Code
authorRouter.patch("/Degree/EditPaymentStatus/:cuponCode", async (req, res) => {
  try {
    //for update payment status in paymentDetails collection
    const cuponCode = req.params.cuponCode;
    const update = await DegreePayments.findOneAndUpdate(
      { cuponCode },
      req.body
    );

    //Update payment status in rescpective game also
    const games = await DegreePayments.find({ cuponCode });
    const gameTalaash = games[0].GameTalaash;
    const gameTechTainment = games[0].GameTechTainment;
    const gameCivilSafari = games[0].GameTheCivilSafari;
    const gameDekathon = games[0].GameDekathon;
    const gameOfficeTennish = games[0].GameOfficeTennis;

    //Update payment sttus in respective game
    //talaash
    if (gameTalaash == "True") {
      await Talaash.findOneAndUpdate({ cuponCode }, req.body);
      console.log("payment status updated in Game Talaash ");
    }

    //tech tainment
    if (gameTechTainment == "True") {
      await Techtaimnet.findOneAndUpdate({ cuponCode }, req.body);
      console.log("payment status updated in Game TechTainment");
    }

    //the civil safari
    if (gameCivilSafari == "True") {
      await theCivilSafari.findOneAndUpdate({ cuponCode }, req.body);
      console.log("payment status updated in Game The Civil Safari ");
    }

    //dekathhon
    if (gameDekathon == "True") {
      await Dekathon.findOneAndUpdate({ cuponCode }, req.body);
      console.log("payment status updated in Game Dekathon");
    }

    //office tenish
    if (gameOfficeTennish == "True") {
      await offilceTennis.findOneAndUpdate({ cuponCode }, req.body);
      console.log("payment status updated in Game Office Tennis");
    }

    res.status(201).send(update);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ****************************************************************************************//

//For Diploma Students
//Store payments --> that selp to showing payment history
authorRouter.post("/Diploma/payments/add", async (req, res) => {
  try {
    // --> get data from the client
    const {
      userId,
      cuponCode,
      paymentStatus,
      amount,
      timeDate,
      GameProjectExpo,
      GamePosterTalk,
      GameTechnoSketch,
      GameSharkTank,
      GameGullyCricket,
      GameVadicMaths,
      GameOneMinuteGame,
      GameTechOModel,
      GameMultimediaPrse,
      playername,
      playeremail,
      playercollgename,
      playerenrollmentNo,
      playerContectNo,
    } = req.body;

    let payment = new DiplomaPayments({
      userId,
      cuponCode,
      paymentStatus,
      amount,
      timeDate,
      GameProjectExpo,
      GamePosterTalk,
      GameTechnoSketch,
      GameSharkTank,
      GameGullyCricket,
      GameVadicMaths,
      GameOneMinuteGame,
      GameTechOModel,
      GameMultimediaPrse,
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
authorRouter.get("/Diploma/payments/:userId", async (req, res) => {
  const userId = req.params.userId;
  // const payments = await db.collection("Payments").find({ userId }).toArray();
  const payments = await DiplomaPayments.find({ userId });
  res.json(payments);
});

//Get Payment Details Using Coupen Code --> Show Payment and all other details to ADMIN
authorRouter.get(
  "/Diploma/PaymentDetailsForAdmin/:cuponCode",
  async (req, res) => {
    const cuponCode = req.params.cuponCode;
    // const payments = await db.collection("Payments").find({ userId }).toArray();
    const payments = await DiplomaPayments.find({ cuponCode });
    res.json(payments);
  }
);

//Update Payment Status Using Coupn Code
authorRouter.patch(
  "/Diploma/EditPaymentStatus/:cuponCode",
  async (req, res) => {
    try {
      //for update payment status in paymentDetails collection
      const cuponCode = req.params.cuponCode;
      const update = await DiplomaPayments.findOneAndUpdate(
        { cuponCode },
        req.body
      );

      //Update payment status in rescpective game also
      const games = await DiplomaPayments.find({ cuponCode });
      const gameProjectExpo = games[0].GameProjectExpo;
      const gamePosterTalk = games[0].GamePosterTalk;
      const gameTechnoSketch = games[0].GameTechnoSketch;
      const gameSharkTank = games[0].GameSharkTank;
      const gameGullyCricket = games[0].GameGullyCricket;
      const gameVadicMaths = games[0].GameVadicMaths;
      const gameOneMinuteGame = games[0].GameOneMinuteGame;
      const gameTechOModel = games[0].GameTechOModel;
      const gameMultimediaPrse = games[0].GameMultimediaPrse;

      //Update payment sttus in respective game
      //ProjectExpo
      if (gameProjectExpo == "True") {
        await ProjectExpo.findOneAndUpdate({ cuponCode }, req.body);
        console.log("payment status updated in Game ProjectExpo ");
      }

      //Poster Talk
      if (gamePosterTalk == "True") {
        await PosterTalk.findOneAndUpdate({ cuponCode }, req.body);
        console.log("payment status updated in Game PosterTalk");
      }

      //the TechnoSketch
      if (gameTechnoSketch == "True") {
        await TechnoSketch.findOneAndUpdate({ cuponCode }, req.body);
        console.log("payment status updated in Game The Techno Sketch");
      }

      //SharkTank
      if (gameSharkTank == "True") {
        await SharkTank.findOneAndUpdate({ cuponCode }, req.body);
        console.log("payment status updated in Game SharkTank");
      }

      //gameGullyCricket
      if (gameGullyCricket == "True") {
        await GullyCricket.findOneAndUpdate({ cuponCode }, req.body);
        console.log("payment status updated in Game Gully Cricket");
      }

      //VadicMaths
      if (gameVadicMaths == "True") {
        await VadicMaths.findOneAndUpdate({ cuponCode }, req.body);
        console.log("payment status updated in Game VadicMaths");
      }

      //OneMinuteGame
      if (gameOneMinuteGame == "True") {
        await OneMinuteGame.findOneAndUpdate({ cuponCode }, req.body);
        console.log("payment status updated in Game OneMinuteGame");
      }

      //TechOModel
      if (gameTechOModel == "True") {
        await TechOModel.findOneAndUpdate({ cuponCode }, req.body);
        console.log("payment status updated in Game TechOModel");
      }

      //MultimediaPrse
      if (gameMultimediaPrse == "True") {
        await MultimediaPrse.findOneAndUpdate({ cuponCode }, req.body);
        console.log("payment status updated in Game Multimedia Prse");
      }

      res.status(201).send(update);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
);

// ****************************************************************************************//
//when user participated then store user detail in particluar game

//For Degree Games
//for techtainment
authorRouter.post("/api/Degree/Games/Techtaimnet", async (req, res) => {
  try {
    //-->get the data from the client
    const {
      cuponCode,
      paymentStatus,
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
      cuponCode,
      paymentStatus,
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
      cuponCode,
      paymentStatus,
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
      cuponCode,
      paymentStatus,
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
      cuponCode,
      paymentStatus,
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
      cuponCode,
      paymentStatus,
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
      cuponCode,
      paymentStatus,
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
      cuponCode,
      paymentStatus,
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
      cuponCode,
      paymentStatus,
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
      cuponCode,
      paymentStatus,
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

// ****************************************************************************************//
//For Diploma Games

//for GullyCricket
authorRouter.post("/api/Diploma/Games/GullyCricket", async (req, res) => {
  try {
    //-->get the data from the client
    const {
      cuponCode,
      paymentStatus,
      timeDate,
      leadername,
      leaderemail,
      leadercollgename,
      leaderenrollmentNo,
      leaderSem,
      leaderBranch,
      leaderContactNo,
    } = req.body;

    let GullyCricketUser = new GullyCricket({
      cuponCode,
      paymentStatus,
      timeDate,
      leadername,
      leaderemail,
      leadercollgename,
      leaderenrollmentNo,
      leaderSem,
      leaderBranch,
      leaderContactNo,
    });

    GullyCricketUser = await GullyCricketUser.save();
    res.status(201).send(GullyCricketUser);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//for One Minute Game
authorRouter.post("/api/Diploma/Games/OneMinuteGame", async (req, res) => {
  try {
    //-->get the data from the client
    const {
      cuponCode,
      paymentStatus,
      timeDate,
      leadername,
      leaderemail,
      leadercollgename,
      leaderenrollmentNo,
      leaderSem,
      leaderBranch,
      leaderContactNo,
    } = req.body;

    let OneMinuteGameUser = new OneMinuteGame({
      cuponCode,
      paymentStatus,
      timeDate,
      leadername,
      leaderemail,
      leadercollgename,
      leaderenrollmentNo,
      leaderSem,
      leaderBranch,
      leaderContactNo,
    });

    OneMinuteGameUser = await OneMinuteGameUser.save();
    res.status(201).send(OneMinuteGameUser);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//for Poster Talk
authorRouter.post("/api/Diploma/Games/PosterTalk", async (req, res) => {
  try {
    //-->get the data from the client
    const {
      cuponCode,
      paymentStatus,
      timeDate,
      leadername,
      leaderemail,
      leadercollgename,
      leaderenrollmentNo,
      leaderSem,
      leaderBranch,
      leaderContactNo,
    } = req.body;

    let PosterTalkUser = new PosterTalk({
      cuponCode,
      paymentStatus,
      timeDate,
      leadername,
      leaderemail,
      leadercollgename,
      leaderenrollmentNo,
      leaderSem,
      leaderBranch,
      leaderContactNo,
    });

    PosterTalkUser = await PosterTalkUser.save();
    res.status(201).send(PosterTalkUser);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//for Techno Sketch
authorRouter.post("/api/Diploma/Games/TechnoSketch", async (req, res) => {
  try {
    //-->get the data from the client
    const {
      cuponCode,
      paymentStatus,
      timeDate,
      leadername,
      leaderemail,
      leadercollgename,
      leaderenrollmentNo,
      leaderSem,
      leaderBranch,
      leaderContactNo,
    } = req.body;

    let TechnoSketchUser = new TechnoSketch({
      cuponCode,
      paymentStatus,
      timeDate,
      leadername,
      leaderemail,
      leadercollgename,
      leaderenrollmentNo,
      leaderSem,
      leaderBranch,
      leaderContactNo,
    });

    TechnoSketchUser = await TechnoSketchUser.save();
    res.status(201).send(TechnoSketchUser);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//for Vadic Maths
authorRouter.post("/api/Diploma/Games/VadicMaths", async (req, res) => {
  try {
    //-->get the data from the client
    const {
      cuponCode,
      paymentStatus,
      timeDate,
      leadername,
      leaderemail,
      leadercollgename,
      leaderenrollmentNo,
      leaderSem,
      leaderBranch,
      leaderContactNo,
    } = req.body;

    let VadicMathsUser = new VadicMaths({
      cuponCode,
      paymentStatus,
      timeDate,
      leadername,
      leaderemail,
      leadercollgename,
      leaderenrollmentNo,
      leaderSem,
      leaderBranch,
      leaderContactNo,
    });

    VadicMathsUser = await VadicMathsUser.save();
    res.status(201).send(VadicMathsUser);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//for MultiMediaPrse
authorRouter.post("/api/Diploma/Games/MultiMediaPrse", async (req, res) => {
  try {
    //-->get the data from the client
    const {
      cuponCode,
      paymentStatus,
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

    let MultimediaPrseUser = new MultimediaPrse({
      cuponCode,
      paymentStatus,
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

    MultimediaPrseUser = await MultimediaPrseUser.save();
    res.status(201).send(MultimediaPrseUser);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//for Shark Tank
authorRouter.post("/api/Diploma/Games/SharkTank", async (req, res) => {
  try {
    //-->get the data from the client
    const {
      cuponCode,
      paymentStatus,
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

    let SharkTankUser = new SharkTank({
      cuponCode,
      paymentStatus,
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

    SharkTankUser = await SharkTankUser.save();
    res.status(201).send(SharkTankUser);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//for Tech-O-Model
authorRouter.post("/api/Diploma/Games/TechOModel", async (req, res) => {
  try {
    //-->get the data from the client
    const {
      cuponCode,
      paymentStatus,
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

    let TechOModelUser = new TechOModel({
      cuponCode,
      paymentStatus,
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

    TechOModelUser = await TechOModelUser.save();
    res.status(201).send(TechOModelUser);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//for Projec Expo
authorRouter.post("/api/Diploma/Games/ProjecExpo", async (req, res) => {
  try {
    //-->get the data from the client
    const {
      cuponCode,
      paymentStatus,
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

    let ProjectExpoUser = new ProjectExpo({
      cuponCode,
      paymentStatus,
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

    ProjectExpoUser = await ProjectExpoUser.save();
    res.status(201).send(ProjectExpoUser);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = authorRouter;
