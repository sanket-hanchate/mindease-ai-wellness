const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {

    const {
      fullName,
      email,
      gender,
      phone,
      password,
      maritalStatus,
      profession,
    } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    await User.create({
      fullName,
      email,
      gender,
      phone,
      password: hashedPassword,
      maritalStatus,
      profession,
    });

    res.status(201).json({
      success: true,
      message: "Registration successful",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user =
      await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const payload = {
      userId: user._id,
    };

    console.log("Signing JWT payload:", payload);

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      token,
      user: {
        fullName: user.fullName,
        email: user.email,
        gender: user.gender,
        phone: user.phone,
        maritalStatus: user.maritalStatus,
        profession: user.profession,
      },
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

exports.getCurrentUser = async (req, res) => {
  try {

    const userId = req.user.userId || req.user.id;
    const user =
      await User.findById(userId)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};