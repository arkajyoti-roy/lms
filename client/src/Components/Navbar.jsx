import { CropIcon, MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const user = true;

  return (
    <div className="h-16 dark:bg-[#0A0A0A] bg-[#F9FAFB] flex items-center  md:justify-around md:gap-96 px-4 shadow-md fixed top-0 left-0 right-0 duration-300 justify-between z-40">
      <div className="flex items-center space-x-2">
        <CropIcon size={"30"} />
        <h1 className="font-extrabold text-2xl">XYZ</h1>
      </div>

      <div className="block md:hidden">
        <Sheet>
          <SheetTrigger>
            <MenuIcon size={"30"} />
          </SheetTrigger>
          <SheetContent>
            {user ? (
              <>
                <SheetHeader>
                  {/* <SheetTitle> */}
                    {" "}
                    <div className="flex justify-center items-center ">
    <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
    </Avatar>
</div>
                  {/* </SheetTitle> */}
                  <SheetTitle>My Account</SheetTitle>
<div className="flex flex-col space-y-1 justify-start items-start text-2xl font-semibold">
                  <button>xyz</button>
                  <button>xyz</button>
                  <button>xyz</button>
                  </div>
                  <Button>Logout</Button>
                </SheetHeader>
              </>
            ) : (
              <div className="flex flex-col space-y-4 mt-8">
                <Button>Login</Button>
                <Button>Signup</Button>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden md:flex items-center space-x-4">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex space-x-4">
            <Button>Login</Button>
            <Button>Signup</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
