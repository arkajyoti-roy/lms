import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Progress } from "@/components/ui/progress";
import { useParams, useNavigate } from "react-router-dom";

const LectureTab = () => {
  const [title, setTitle] = useState("");
  const [uploadInfo, setUploadInfo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisabled, setBtnDisabled] = useState(true);

  const params = useParams();
  const navigate = useNavigate();
  const courseId = params.courseId;
  const lectureId = params.lectureId;

  useEffect(() => {
    // Fetch existing lecture details
    const fetchLecture = async () => {
      try {
        console.log('Fetching lecture details for courseId:', courseId, 'lectureId:', lectureId);
        const res = await axios.get(`http://localhost:8081/api/v1/course/${courseId}/lecture/${lectureId}`, {
          withCredentials: true,
        });
        console.log("fetched");
        setTitle(res.data.lecture.lectureTitle);
        setUploadInfo({
          videoUrl: res.data.lecture.videoUrl,
          publicId: res.data.lecture.publicId,
        });
        setIsFree(res.data.lecture.isPreviewFree);
        setBtnDisabled(false);
        if (res.data.success) {
          setTitle(res.data.lecture.lectureTitle);
          setUploadInfo({
            videoUrl: res.data.lecture.videoUrl,
            publicId: res.data.lecture.publicId,
          });
          setIsFree(res.data.lecture.isPreviewFree);
          setBtnDisabled(false);
          console.log('Fetched lecture details:', res.data.lecture);
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch lecture details");
      }
    };
    fetchLecture();
  }, [courseId, lectureId]);

  const fileChangeHandle = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      setMediaProgress(true);
      try {
        console.log('Uploading file...');
        const res = await axios.post(`http://localhost:8081/api/v1/media/upload-video`, formData, {
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
          console.log('File uploaded successfully:', res.data.data);
        }
      } catch (error) {
        console.log(error);
        toast.error("Upload failed");
      } finally {
        setMediaProgress(false);
      }
    }
  };

  const handleUpdateLecture = async () => {
    const lectureData = {
      lectureTitle: title,
      videoInfo: {
        videoUrl: uploadInfo?.videoUrl,
        publicId: uploadInfo?.publicId,
      },
      isPreviewFree: isFree,
    };

    console.log('Editing lecture with data:', lectureData);
    console.log('Course ID:', courseId, 'Lecture ID:', lectureId);

    try {
      const res = await axios.post(`http://localhost:8081/api/v1/course/${courseId}/lecture/${lectureId}`, lectureData, {
        withCredentials: true,
      });
      console.log('Response:', res.data);
      toast.success(res.data.message);
      navigate(`/admin/course/${courseId}/lecture`);
    } catch (error) {
      console.error('Error details:', error.response || error.message || error);
      toast.error('An error occurred while updating the lecture');
    }
  };

  const removeLecture = async () => {
    console.log('Removing lecture with ID:', lectureId);
    try {
      const res = await axios.delete(`http://localhost:8081/api/v1/course/${courseId}/lecture/${lectureId}`, {
        withCredentials: true,
      });
      console.log('Response:', res.data);
      toast.success(res.data.message);
      navigate(`/admin/course/${courseId}/lecture`); // Redirect to course page after removal
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while removing the lecture");
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="flex justify-between">
          <div>
            <CardTitle>Edit Lecture</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="destructive" onClick={() => { removeLecture(); setBtnDisabled(true); }}>Remove Lecture</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <Label>Title</Label>
            <Input 
              type="text" 
              placeholder="Ex. Introduction to JS" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
            <Button 
              disabled={btnDisabled} 
              onClick={() => {
                setBtnDisabled(true);
                handleUpdateLecture();
              }}
            >
              Update Lecture
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default LectureTab;