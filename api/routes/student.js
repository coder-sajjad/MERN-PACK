import express from "express";
import { createStudnet, deleteStudnet, getAllStudent, getSingleStudent, updateStudnet } from "../controllers/studentController.js";
import authMiddleware from "../middlewares/authMiddlewares.js";


// Init router
const router = express.Router();

// Route
router.route('/').get(authMiddleware, getAllStudent);
router.route('/:id').get(authMiddleware, getSingleStudent).put(authMiddleware, updateStudnet).patch(authMiddleware, updateStudnet).delete(authMiddleware, deleteStudnet);
router.route('/').post(authMiddleware, createStudnet);


// Export router
export default router;