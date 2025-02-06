import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { COURSES_URL } from "@/Components/url";
import { toast } from "react-toastify";

const CreateLecture = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [lectureTitle, setLectureTitle] = useState("");
  const [lectures, setLectures] = useState([]); // Initialize as an empty array
  const params = useParams();
  const courseId = params.courseId;

  const createLectureHandler = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${COURSES_URL}/${courseId}/lecture`,
        { lectureTitle: lectureTitle },
        {
          withCredentials: true, // If your API requires credentials
        }
      );
      console.log("Lecture created:", response.data);
      toast.success("Lecture created successfully!");
      // navigate(`/admin/course/${courseId}`);
      // Optionally, fetch the updated list of lectures
      getLectures();
    } catch (error) {
      console.error("Error creating lecture!", error);
      toast.error(error.response?.data?.message || "Error creating lecture!");
    } finally {
      setIsLoading(false);
    }
  };

  const getLectures = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${COURSES_URL}/${courseId}/lecture`, {
        withCredentials: true, // If your API requires credentials
      });
      setLectures(response.data.lectures);
      console.log("Lectures fetched:", response.data);
    } catch (error) {
      console.error("Error fetching lecture data!", error);
      toast.error(error.response?.data?.message || "Error fetching lecture data!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getLectures();
  }, [courseId]);

  return (
    <>
      <div className="flex-1 mx-10">
        <div className="mb-4">
          <h1 className="font-bold text-xl">Add new lectures with details...</h1>
        </div>

        <div className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              value={lectureTitle}
              onChange={(e) => {
                setLectureTitle(e.target.value);
              }}
              placeholder="Title name"
            />
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => navigate(`/admin/course/${courseId}`)}
              variant="outline"
            >
              Back to course
            </Button>
            <Button disabled={isLoading} onClick={createLectureHandler}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  please wait
                </>
              ) : (
                "Create lecture"
              )}
            </Button>
          </div>
        </div>

      <div className="lecture-list mt-8">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading lectures...
          </div>
        ) : lectures.length > 0 ? (
          <div className="space-y-4">
            <h2 className="font-bold text-xl">Lectures</h2>
            <ul className="list-disc pl-5">
              {lectures.map((lecture) => (
                <li key={lecture._id}>{lecture.lectureTitle}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No lectures found.</p>
        )}
        {/* <div className="mt-4">
          <Button onClick={() => navigate(`/admin/course/${courseId}`)} variant="outline">
            Back to course
          </Button>
        </div> */}
      </div>
      </div>

    </>
  );
};

export default CreateLecture;
