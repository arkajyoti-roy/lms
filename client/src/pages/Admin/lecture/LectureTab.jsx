import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Switch } from "@/components/ui/switch"

const LectureTab = () => {
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
            <Input type="text" placeholder="Ex. Introduction to JS" />
          </div>
          <div>
            <Label>File *</Label>
            <Input
              type="file"
              accept=".pdf,video/*,image/*"
              className="w-fit"
            />
          </div>
          <div className="flex items-center space-x-2 my-5">
          <Switch id="airplane-mode" />
          <Label htmlFor="airplane-mode">Is Free</Label>

          </div>
          <div className="mt-4">
            <Button>Update Lecture</Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default LectureTab;
