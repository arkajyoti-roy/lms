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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";

const CourseTab = () => {
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
    const { name, value } = e.targer;
    setInput({ ...input, [name]: value });
  };

  const isPublished = true;
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Basic course Details</CardTitle>
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
              placeholder="ex. Fullstack developer"
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
              <Select>
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
            <Select>
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
            className="w-fit"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;
