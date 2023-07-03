const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchUser");

const JWT_SECRET = "Bhaveshisagoodguy";

// Route 1
// Create a User using: POST "/api/auth/createUser". no login required
router.post(
  
  "/createUser",
  [
    body("name", "Enter a Valid Name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 letters ").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false
    //if there are errors, return bad request and the errors

    // if used  '/auth/api' again then the url will become localhost:3000/api/auth/api/auth
    // hence '/' signifies '/api/auth' itself
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // check whether the user with this email exist already

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({success, errors: "Sorry a user already exist with this email " });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      // create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      //   .then((user) => res.json(user))
      //   .catch((err) => {
      //     console.log(err);
      //     res.json({
      //       error: "Sorry a user with this email already exists",
      //       message: err.message,
      //     });
      //   });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      console.log(authToken);

      // res.json(user);
      success=true
      res.json({success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error request");
    }
  }
);

// Route 2
// Create a User using: POST "/api/auth/login". no login required

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    // is there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        let success=false
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      success=true
      res.json({success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Error occured");
    }
  }
);

// Route 3
// Get loggedin user details using: POST "api/auth/getUser". login required

router.post("/getUser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
