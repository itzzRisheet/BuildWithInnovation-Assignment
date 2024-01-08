import { Router } from "express";
import * as controller from "../controller/controller.js";
import auth from "../middleware/auth.js";

const router = Router();

//Post Requests
router.route("/register").post(controller.validate, controller.register);
router.route("/login").post(controller.login);
router.route("/authenticate").post();
router.route("/user").post(auth, controller.getUser);

//Get requests
router.route("/createResetSession").get();

//Put requests
router.route("/updateUser/").put(auth, controller.updateUser);
router.route("/resetPassword").put();

export default router;
