import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

// user registration
router.post("/register", async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const hasdPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hasdPassword,
      email,
    });
    await user.save();
    return res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.log("error: ", error.message);
    return res.status(500).json({
      error: "Registration failed",
    });
  }
});

// User login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        error: "Authentication failed",
      });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        error: "Authentication failed and wrong password",
      });
    }
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ token });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      err: "Login Failed",
    });
  }
});

export default router;
