import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { createCourse, editCourse, getCourseById, getCreatorCourses } from '../controllers/course.controller.js';
import upload from '../utils/multer.js'; // Correct import path

const router = express.Router();

router.route('/').post(isAuthenticated, createCourse);
router.route('/getCourses').get(isAuthenticated, getCreatorCourses);
router.route('/:courseId').put(isAuthenticated, upload.single("courseThumbnail"), editCourse);
router.route('/:courseId').get(isAuthenticated, getCourseById);


export default router;
