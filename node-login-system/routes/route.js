import { Router } from "express";
import * as controller from "../controller/controller.js";
import auth from "../middleware/auth.js";

const router = Router();

//Post Requests
router.route("/register").post(controller.validate, controller.register);
router.route("/login").post(controller.login);
router.route("/authenticate").post();
router.route("/user").post(auth, controller.getUser);
router.route("/deleteUser").delete(auth, controller.deleteUser);

//Get requests
router.route("/randomtext").get(controller.generaterandomeText);

//Put requests
router.route("/updateUser/").put(auth, controller.updateUser);

export default router;
