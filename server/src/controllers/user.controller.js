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
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const accessToken = jwt.sign(
      { _id: foundUser._id, email: foundUser.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
      { _id: foundUser._id, email: foundUser.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
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

const handleRefreshToken = async (req, res) => {
  const refreshToken =
    req.cookies?.refreshToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  try {
    // Check if the refresh token exists
    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token is missing" });
    }

    // Verify the refresh token
    const decodedRefreshToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    // Find the user by decoded token's ID
    const user = await User.findById(decodedRefreshToken._id);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // Generate a new access token
    const newAccessToken = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15min" } // Short expiration for access tokens
    );

    // Return the new tokens
    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };

    return res
      .status(200)
      .cookie("accessToken", newAccessToken, options)
      .json({ message: "Token refreshed", accessToken: newAccessToken });
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Refresh token is invalid or expired" });
  }
};

const protectedRoute = (req, res) => {
  console.log("This is a protected route");
  res.status(200).json({ message: "Accessed protected route" });
};

const assignRole = async (req, res) => {
  const { email, roles } = req.body;

  // Check if roles array is valid
  if (
    !Array.isArray(roles) ||
    roles.some((role) => !["Admin", "Author", "User"].includes(role))
  ) {
    return res.status(400).json({ message: "Invalid roles provided" });
  }

  try {
    // Find the user to update by their ID
    const userToUpdate = await User.findOne({ email });

    if (!userToUpdate) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's roles
    userToUpdate.roles = roles;
    await userToUpdate.save();

    return res.status(200).json({
      message: "User roles updated successfully",
      data: { email: userToUpdate.email, roles: userToUpdate.roles },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  registerUser,
  loginUser,
  protectedRoute,
  handleRefreshToken,
  assignRole,
};
