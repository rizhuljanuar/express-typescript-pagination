import { Router } from "express";
import User from "../controllers/UserController";

const router = Router();
const userController = new User();

router.get("/users", userController.get);

export default router;
