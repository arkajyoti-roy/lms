import Course from "./Course";
import CourseSkeleton from "./CourseSkeleton";

const MyLearning = () => {
  const isLoading = false;
  const myLearningCourses = [1,1];

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-16 mx-auto">
        <h1 className="mt-20 font-bold text-2xl mb-9 text-start">My Learning</h1>
        {isLoading ? (
          <CourseSkeleton />
        ) : myLearningCourses.length === 0 ? (
          <p className="text-center">You are not enrolled in any Course.</p>
        ) : (
          <div className="flex flex-wrap -m-2 gap-5">
            {myLearningCourses.map((course, index) => (
              <div
                key={index}
                className="lg:w-1/4 md:w-1/2 w-full p-2 border rounded-lg transition-transform transform hover:scale-105 cursor-pointer"
              >
                <a className="block relative h-48 rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="object-cover object-center w-full h-full block"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMVOXYdhkq4Cxw3Zp6M79c-TfvMPTlWdGnIw&s"
                  />
                </a>
                <div className="mt-4">
                  <h2 className="text-gray-900 title-font text-lg font-medium truncate">
                    Course Title {course}
                  </h2>
                  <div className="flex items-center justify-between">
                    <h3 className="text-gray-900 title-font text-s font-medium truncate">
                      By Instructor Name
                    </h3>
                    <h3 className="text-xs tracking-widest title-font mb-1">
                      <button className="button">
                        <span className="label">Beginner</span>
                      </button>
                    </h3>
                  </div>
                  <p className="mt-1 text-black text-lg font-semibold">$18.40</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyLearning;
