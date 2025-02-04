import { Course } from "../models/course.model.js"
import { deleteMedia, uploadMedia } from "../utils/cloudinary.js"


export const createCourse = async (req, res) => {
  try {
    const { courseTitle, category } = req.body;
    if (!courseTitle || !category) {
      console.log("This Course Title & Category are required");
      return res.status(400).json({
        message: "This Course Title & Category are required"
      })
    }

    const course = await Course.create({
      courseTitle,
      category,
      creator: req.id
    });



    return res.status(201).json({
      message: "Course Created"
    })





  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Faild to create course"
    })

  }
};

export const getCreatorCourses = async (req, res) => {
  try {
    const userId = req.id;
    const courses = await Course.find({ creator: userId });

    if (!courses || courses.length === 0) {
      return res.status(404).json({
        courses: [],
        message: "Course not found"
      });
    }

    return res.status(200).json({
      courses: courses,
      message: "Course found"
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Failed to fetch course"
    });
  }
};

export const editCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const { courseTitle, subTitle, description, category, courseLevel, coursePrice } = req.body;
    const thumbnail = req.file;

    let course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        message: "Course not found!"
      });
    }

    let courseThumbnail;
    if (thumbnail) {
      if (course.courseThumbnail) {
        const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
        await deleteMedia(publicId);
      }
      courseThumbnail = await uploadMedia(thumbnail.path);
    }

    const updateData = { 
      courseTitle, 
      subTitle, 
      description, 
      category, 
      courseLevel, 
      coursePrice, 
      courseThumbnail: thumbnail?.secure_url 
    };

    course = await Course.findByIdAndUpdate(courseId, updateData, { new: true });

    return res.status(200).json({
      course,
      message: "Updated successfully!"
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Failed to edit course"
    });
  }
};
