import { Router } from "express";
import {
  loginUser,
  protectedRoute,
  registerUser,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";
const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/protected").post(verifyJWT, protectedRoute);

export default router;
