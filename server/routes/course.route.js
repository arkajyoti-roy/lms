import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { createCourse, createLecture, editCourse, editLecture, getCourseById, getCourseLecture, getCreatorCourses, getLectureById, removeLecture } from '../controllers/course.controller.js';
import upload from '../utils/multer.js'; // Correct import path

const router = express.Router();

// Course Routes
router.route('/')
  .post(isAuthenticated, createCourse);

router.route('/getCourses')
  .get(isAuthenticated, getCreatorCourses);

router.route('/:courseId')
  .put(isAuthenticated, upload.single("courseThumbnail"), editCourse)
  .get(isAuthenticated, getCourseById);

// Lecture Routes
router.route('/:courseId/lecture')
  .post(isAuthenticated, createLecture)
  .get(isAuthenticated, getCourseLecture);

router.route('/:courseId/lecture/:lectureId')
  .post(isAuthenticated, editLecture);

router.route('/lecture/:lectureId')
  .delete(isAuthenticated, removeLecture)
  .get(isAuthenticated, getLectureById);

export default router;
