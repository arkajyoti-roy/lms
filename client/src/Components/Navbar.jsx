import { CropIcon, MenuIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLoadUserQuery, useLogoutUserMutation } from "@/features/api/authApi";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "../features/authSlice"; // Ensure this path is correct
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "react-toastify";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const { data, isLoading } = useLoadUserQuery();
  const dispatch = useDispatch();
  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;

  const user = data?.user;

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(userLoggedOut());
      console.log('Logout successful');
      window.location.reload();
      toast.success((user && user.message) || "Logout Successful!");
      console.log(user.message);
      
      setTimeout(() => navigate('/'), 5000);
      // navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="h-16 dark:bg-[#0A0A0A] bg-[#F9FAFB] flex items-center md:justify-around md:gap-96 px-4 shadow-md fixed top-0 left-0 right-0 duration-300 justify-between z-40">
      <Link to="/">
        <div className="flex items-center space-x-2">
          <CropIcon size={"30"} />
          <h1 className="font-extrabold text-2xl">XYZ</h1>
        </div>
      </Link>
      <div className="block md:hidden">
        <Sheet>
          <SheetTrigger>
            <MenuIcon size={"30"} />
          </SheetTrigger>
          <SheetContent>
            {user ? (
              <>
                <SheetHeader>
                  <div className="flex justify-center items-center">
                    <Avatar>
                      <AvatarImage src={user.photoUrl || "https://github.com/shadcn.png"} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
                  <SheetTitle>My Account</SheetTitle>
                  <div className="flex flex-col space-y-1 justify-start items-start text-2xl font-semibold">
                    <button><Link to="profile">Profile</Link></button>
                    <button><Link to="my-learning">My Learning</Link></button>
                    <button>xyz</button>
                  </div>
                  <Button onClick={handleLogout}>Logout</Button>
                </SheetHeader>
              </>
            ) : (
              <div className="flex flex-col space-y-4 mt-8">
                <Button><Link to="login">Login</Link></Button>
                <Button><Link to="login">Signup</Link></Button>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden md:flex items-center space-x-4">
        {user ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={user.photoUrl || "https://github.com/shadcn.png"} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem><Link to="profile">Profile</Link></DropdownMenuItem>
                <DropdownMenuItem><Link to="my-learning">My Learning</Link></DropdownMenuItem>
                <DropdownMenuItem><Button onClick={handleLogout}>Logout</Button></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div>
              <span>{user.name}</span>
            </div>
          </>
        ) : (
          <div className="flex space-x-4">
            <Button><Link to="login">Login</Link></Button>
            <Button><Link to="login">Signup</Link></Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;