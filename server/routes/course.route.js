import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { createCourse, createLecture, editCourse, getCourseById, getCourseLecture, getCreatorCourses } from '../controllers/course.controller.js';
import upload from '../utils/multer.js'; // Correct import path

const router = express.Router();

router.route('/').post(isAuthenticated, createCourse);
router.route('/getCourses').get(isAuthenticated, getCreatorCourses);
router.route('/:courseId').put(isAuthenticated, upload.single("courseThumbnail"), editCourse);
router.route('/:courseId').get(isAuthenticated, getCourseById);
router.route('/:courseId/lecture').post(isAuthenticated, createLecture)
router.route('/:courseId/lecture').get(isAuthenticated, getCourseLecture)

export default router;
