import { BASE_URL, COURSES_URL } from "@/Components/url";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Star, Clock, Users, BookOpen, User, TrendingUp } from "lucide-react";

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${COURSES_URL}/publichedCourses`);
        setCourses(response.data.courses);
        console.log(response.data.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError("Failed to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const getLevelColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getLevelIcon = (level) => {
    switch (level?.toLowerCase()) {
      case 'beginner':
        return <BookOpen className="w-3 h-3" />;
      case 'intermediate':
        return <TrendingUp className="w-3 h-3" />;
      case 'advanced':
        return <Star className="w-3 h-3" />;
      default:
        return <BookOpen className="w-3 h-3" />;
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-300 dark:bg-slate-700"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gray-300 dark:bg-slate-700 rounded"></div>
                  <div className="h-4 bg-gray-300 dark:bg-slate-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 dark:bg-slate-700 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-xl max-w-md mx-4">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Oops! Something went wrong</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-xl max-w-md mx-4">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">No Courses Available</h3>
          <p className="text-gray-600 dark:text-gray-400">Check back later for new courses!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
            Available Courses
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Discover amazing courses crafted by expert instructors to help you achieve your learning goals
          </p>
          <div className="mt-6 flex items-center justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <BookOpen className="w-4 h-4" />
              <span>{courses.length} Courses</span>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map((course) => (
            <Link 
              to={`course-detail/${course._id}`} 
              key={course._id}
              className="group block transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200/50 dark:border-slate-700/50 group-hover:border-blue-300 dark:group-hover:border-blue-600 transition-all duration-300">
                {/* Course Thumbnail */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    alt={`${course.courseTitle} thumbnail`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    src={course.courseThumbnail || "https://via.placeholder.com/400x200?text=Course+Image"}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x200?text=Course+Image";
                    }}
                  />
                  
                  {/* Level Badge */}
                  <div className="absolute top-3 right-3">
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(course.courseLevel)}`}>
                      {getLevelIcon(course.courseLevel)}
                      <span className="capitalize">{course.courseLevel || 'Beginner'}</span>
                    </span>
                  </div>

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg px-4 py-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">View Course</span>
                    </div>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-6">
                  {/* Course Title */}
                  <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                    {course.courseTitle}
                  </h2>

                  {/* Instructor Info */}
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {course.creator?.name || 'Unknown Instructor'}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Instructor</p>
                    </div>
                  </div>

                  {/* Course Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-500" />
                      <span>4.8 (120)</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>1.2k students</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        ₹{course.coursePrice}
                      </span>
                      {course.originalPrice && course.originalPrice > course.coursePrice && (
                        <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                          ₹{course.originalPrice}
                        </span>
                      )}
                    </div>
                    
                    {/* Action Button */}
                    <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg">
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More Button (if needed) */}
        {courses.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 font-medium px-8 py-3 rounded-xl border border-gray-200 dark:border-slate-700 transition-all duration-200 shadow-md hover:shadow-lg">
              Load More Courses
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Course;