import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { createCourse, getCreatorCourses } from '../controllers/course.controller.js';
// import upload from '../utils/multer.js'; // Correct import path

const router = express.Router();

router.route('/').post(isAuthenticated, createCourse);
router.route('/getCourses').get(isAuthenticated, getCreatorCourses);


export default router;
