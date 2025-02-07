import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { createCourse, createLecture, editCourse, editLecture, getCourseById, getCourseLecture, getCreatorCourses, getLectureById, removeLecture } from '../controllers/course.controller.js';
import upload from '../utils/multer.js'; // Correct import path

const router = express.Router();

router.route('/').post(isAuthenticated, createCourse);
router.route('/getCourses').get(isAuthenticated, getCreatorCourses);
router.route('/:courseId').put(isAuthenticated, upload.single('courseThumbnail'), editCourse);
router.route('/:courseId').get(isAuthenticated, getCourseById);
router.route('/:courseId/lecture').post(isAuthenticated, createLecture);
router.route('/:courseId/lecture').get(isAuthenticated, getCourseLecture);

router.route('/:courseId/lecture/:lectureId').post(isAuthenticated, (req, res, next) => {
  console.log('Request received for editLecture');
  next();
}, editLecture);

router.route('/lecture/:lectureId').delete(isAuthenticated, removeLecture);
router.route('/lecture/:lectureId').get(isAuthenticated, getLectureById);

export default router;
