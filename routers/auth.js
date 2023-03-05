const express = require("express");

//for call schema with model
const { DegreeUsers, DiplomaUsers } = require("../model/user");

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

module.exports = authorRouter;
