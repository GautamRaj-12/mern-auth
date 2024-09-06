import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  const { email, fullName, password } = req.body;
  try {
    if (!email || !fullName || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const duplicateUser = await User.findOne({ email });
    if (duplicateUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    const newUser = await User.create({ email, fullName, password });
    if (!newUser) {
      return res
        .status(500)
        .json({ message: "Something went wrong while registering!" });
    }

    const userDataToSend = await User.findById(newUser._id).select("-password");

    return res.status(200).json({
      message: "User Registered Successfully",
      data: { userDataToSend },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const isPasswordValid = await foundUser.isPasswordCorrect(password);

    if (!isPasswordValid) {
      return res.status(401), json({ message: "Invalid Credentials" });
    }

    const accessToken = jwt.sign(
      { email: foundUser.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
    const refreshToken = jwt.sign(
      { email: foundUser.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );

    foundUser.refreshToken = refreshToken;
    await foundUser.save({ validateBeforeSave: false });

    const loggedInUser = await User.findById(foundUser._id).select(
      "-password -refreshToken"
    );

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        message: "Login Successfull",
        data: { loggedInUser },
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { registerUser, loginUser };
