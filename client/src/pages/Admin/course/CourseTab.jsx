import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import RichTextEditor from "@/Components/RichTextEditor";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const CourseTab = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectCategory = (value) => {
    setInput({ ...input, category: value });
  };

  const selectCourseLevel = (value) => {
    setInput({ ...input, courseLevel: value });
  };

  const [previewThumbnail, setPreviewThumbnail] = useState("");

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setPreviewThumbnail(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const params = useParams();
  const courseId = params.courseId;

  const updateCourseHandler = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);
    formData.append("courseThumbnail", input.courseThumbnail);

    try {
      const response = await axios.put(
        `http://localhost:8081/api/v1/course/${courseId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      toast.success(response.data.message || "Edit Success!");
      navigate("/admin/course");
    } catch (error) {
      console.error("There was an error updating the course!", error);
      toast.error(error.response.data.message || "There was an error updating the course!");
    } finally {
      setIsLoading(false);
    }
  };

  const navigate = useNavigate();
  const isPublished = true;

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Basic Course Details</CardTitle>
          <CardDescription>
            Make changes to your courses. Click save when you are done.
          </CardDescription>
        </div>

        <div className="space-x-2">
          <Button variant="outline">
            {isPublished ? "Unpublished" : "Published"}
          </Button>
          <Button>Remove Course</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-5">
          <div>
            <Label>Title</Label>
            <Input
              name="courseTitle"
              type="text"
              value={input.courseTitle}
              onChange={changeEventHandler}
              placeholder="ex. Fullstack Developer"
            />
          </div>
          <div>
            <Label>Subtitle</Label>
            <Input
              name="subTitle"
              type="text"
              value={input.subTitle}
              onChange={changeEventHandler}
              placeholder="ex. Become a fullstack developer from zero to hero"
            />
          </div>
          <div>
            <Label>Description</Label>
            <RichTextEditor input={input} setInput={setInput} />
          </div>
          <div className="flex items-center gap-5">
            <div>
              <Label>Category</Label>
              <Select onValueChange={selectCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Web Development">Web Development</SelectItem>
                  <SelectItem value="DSA">DSA</SelectItem>
                  <SelectItem value="Cloud">Cloud</SelectItem>
                  <SelectItem value="Networking">Networking</SelectItem>
                  <SelectItem value="DBMS">DBMS</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Course Level</Label>
              <Select onValueChange={selectCourseLevel}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a course level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Advance">Advance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Price in (INR)</Label>
              <Input
                type="number"
                name="coursePrice"
                value={input.coursePrice}
                onChange={changeEventHandler}
                placeholder="ex. 133"
                className="w-fit"
              />
            </div>
          </div>
          <div>
            <Label>Course Thumbnail</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={selectThumbnail}
              className="w-fit"
            />
            {previewThumbnail && (
              <img
                src={previewThumbnail}
                className="w-64 my-2"
                alt="course thumbnail"
              />
            )}
          </div>
          <div className="space-x-2">
            <Button onClick={() => navigate("/admin/course")} variant="outline">
              Cancel
            </Button>
            <Button onClick={updateCourseHandler} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;
