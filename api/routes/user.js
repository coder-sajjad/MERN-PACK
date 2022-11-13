import express from "express";
import { createUser, deleteUser, getAllUser, getSingleUser, updateUser, userLogin, userRegister } from "../controllers/userController.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
// import authMiddleware from "../middlewares/authMiddlewares.js";
import userMiddleware from "../middlewares/userMiddleware.js";


// Init router
const router = express.Router();

// Route Rest API
router.route('/').get(adminMiddleware, getAllUser);
router.route('/:id').get(userMiddleware, getSingleUser).put(userMiddleware, updateUser).patch(userMiddleware, updateUser).delete(userMiddleware, deleteUser);
router.route('/').post(userMiddleware, createUser);

// User Auth Route
router.post('/login', userLogin);
router.post('/register', userRegister);

// Export router
export default router;