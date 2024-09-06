import { User } from "../models/user.model.js";

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
  } catch (error) {}
};

export { registerUser };
