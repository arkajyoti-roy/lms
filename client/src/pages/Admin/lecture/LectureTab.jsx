import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Switch } from "@/components/ui/switch";
import { MEDIA_URL } from "@/Components/url";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Progress } from "@/components/ui/progress";

const LectureTab = () => {
  const [title, setTitle] = useState("");
  const [uploadInfo, setUploadInfo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisabled, setBtnDisabled] = useState(true);

  const fileChangeHandle = async (e) => {
    const file = e.target.files[0];  // Corrected here
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      setMediaProgress(true);
      try {
        const res = await axios.post(`${MEDIA_URL}/upload-video`, formData, {
          withCredentials: true,
          onUploadProgress: ({ loaded, total }) => {
            setUploadProgress(Math.round((loaded * 100) / total));
          },
        });
        if (res.data.success) {
          setUploadInfo({
            videoUrl: res.data.data.url,
            publicId: res.data.data.public_id,
          });
          setBtnDisabled(false);
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("upload failed");
      } finally {
        setMediaProgress(false);
      }
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="flex justify-between">
          <div>
            <CardTitle>Edit lecture</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="destructive">Remove Lecture</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <Label>Title</Label>
            <Input 
              type="text" 
              placeholder="Ex. Introduction to JS" 
              value={title}  // Controlled input
              onChange={(e) => setTitle(e.target.value)}  // Handle state update
            />
          </div>
          <div>
            <Label>File *</Label>
            <Input
              onChange={fileChangeHandle}
              type="file"
              accept=".pdf,video/*,image/*"
              className="w-fit"
            />
          </div>
          <div className="flex items-center space-x-2 my-5">
            <Switch id="airplane-mode" checked={isFree} onChange={() => setIsFree(!isFree)} />
            <Label htmlFor="airplane-mode">Is Free</Label>
          </div>

          {mediaProgress && (
            <div className="my-4">
              <p>{uploadProgress}% uploaded</p>
              <Progress value={uploadProgress} />
            </div>
          )}

          <div className="mt-4">
            <Button disabled={btnDisabled}>Update Lecture</Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default LectureTab;
