import { Link } from "react-router-dom";
import { Button } from "@/Components/ui/button";
import CourseTab from "./CourseTab";
const EditCourse = () => {
  return (
    <div className="flex-1 ">
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-bold text-xl">Add details of course</h1>
        <Link>
          <Button variant="link" className="hover:text-blue-600">Go to lecture page</Button>
        </Link>
      </div>
      <CourseTab/> 
    </div>
  );
};

export default EditCourse;
