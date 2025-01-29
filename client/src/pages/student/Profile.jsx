import { Avatar, AvatarImage, AvatarFallback } from "@/Components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import MyLearning from "./MyLearning";
import { useUniversalLogout } from "@/utils/authUtils";
import { useUserDetails } from "@/utils/useUserDetails"; // Corrected import statement

const Profile = () => {
  const handleLogout = useUniversalLogout();
  const { user, isLoading, isError, error } = useUserDetails();

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error: {error.message}</div>;

  if (!user) return <div>No user data found</div>;

  return (
    <>
      <div className="max-w-4xl mx-auto my-24">
        <h1 className="font-bold text-2xl text-center">Profile</h1>
        <div className="flex flex-row items-start mt-8 gap-8">
          <div className="flex items-center space-x-4">
            <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
              <AvatarImage src={user.photoUrl || "https://tcea.campusjadugar.com/uploads/student_profile_pic/1733916387_1229631424_24304013005.jpg"} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <div className="flex flex-col space-y-4">
              <label className="font-semibold text-xl">
                Name:{" "}
                <span className="font-normal text-gray-700">{user.name}</span>
              </label>
              <label className="font-semibold text-xl">
                Email:{" "}
                <span className="font-normal text-gray-700">{user.email}</span>
              </label>
              <label className="font-semibold text-xl">
                Phone:{" "}
                <span className="font-normal text-gray-700">{user.phone}</span>
              </label>
              <label className="font-semibold text-xl">
                Role:{" "}
                <span className="font-normal text-gray-700">
                  {user.role.toUpperCase()}
                </span>
              </label>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="" className="mt-3">
                  Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when
                    you&apos;re done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      defaultValue={user.name}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      defaultValue={user.email}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="password" className="text-right">
                      Password
                    </Label>
                    <Input
                      id="password"
                      defaultValue={user.password}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      defaultValue={user.phone}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="photoUrl" className="text-right">
                      Image
                    </Label>
                    <Input
                      type="file"
                      multiple
                      className="col-span-3"
                      defaultValue={user.photoUrl || ""}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button className="mt-3 ml-3" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
      <div className="" style={{ marginTop: "-190px" }}>
        <MyLearning />
      </div>
    </>
  );
};

export default Profile;
