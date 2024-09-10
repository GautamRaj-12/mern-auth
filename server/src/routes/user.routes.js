import { Router } from "express";
import {
  loginUser,
  protectedRoute,
  registerUser,
  handleRefreshToken,
  assignRole,
  getAllUsers,
  getSingleUser,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";
import { verifyRoles } from "../middlewares/verifyRoles.js";
const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/refresh-token").post(handleRefreshToken);
router.route("/all").get(verifyJWT, verifyRoles("Admin"), getAllUsers);
router.route("/user/:email").get(getSingleUser);
router.route("/protected").post(verifyJWT, protectedRoute);
router.route("/assign-role").post(verifyJWT, verifyRoles("Admin"), assignRole);

export default router;
