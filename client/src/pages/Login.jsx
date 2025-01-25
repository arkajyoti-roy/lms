import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Login = () => {
  const [signup, setSignup] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "student",
  });
  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  const [activeTab, setActiveTab] = useState("signup");

  const handleInputChange = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignup(prevState => ({ ...prevState, [name]: value }));
    } else {
      setLogin(prevState => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = (type) => {
    if (type === "signup") {
      console.log("Signup", signup);
    } else {
      console.log("Login", login);
    }
  }

  return (
    <div className="flex justify-center w-full pt-12">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Signup</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>
                Create a new account and signup when you are done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  onChange={(e) => handleInputChange(e, "signup")}
                  placeholder="Eg. arka"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  onChange={(e) => handleInputChange(e, "signup")}
                  placeholder="Eg. xy@z.com"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  type="text"
                  name="phone"
                  onChange={(e) => handleInputChange(e, "signup")}
                  placeholder="Eg. 1236564554"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  onChange={(e) => handleInputChange(e, "signup")}
                  placeholder="Enter a password"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="role">Role</Label>
                <Input
                  type="text"
                  name="role"
                  onChange={(e) => handleInputChange(e, "signup")}
                  defaultValue="student"
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSubmit("signup")}>Signup</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Login through your email or phone and password.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email or Phone</Label>
                <Input
                  type="email"
                  name="email"
                  onChange={(e) => handleInputChange(e, "login")}
                  placeholder="Eg. xy@z.com or 1236564554"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  onChange={(e) => handleInputChange(e, "login")}
                  placeholder="Eg. xyxz"
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSubmit("login")}>Login</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;

