
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
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
// import { useLoginMutation, useSignupMutation } from "@/features/api/authApi.js";
import { useRegisterUserMutation, useLoginUserMutation } from '../features/api/authApi';

import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [signup, setSignup] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "student",
  });
  const [login, setLogin] = useState({
    identifier: "",
    password: "",
  });

  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();
  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();
const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("signup");

  const handleInputChange = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignup((prevState) => ({ ...prevState, [name]: value }));
    } else {
      setLogin((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = async (type) => {
    const inputData = type === "signup" ? signup : login;
    const action = type === "signup" ? registerUser : loginUser;
  
    console.log('Submitting data:', inputData);  // Log the request payload
  
    try {
      const result = await action(inputData).unwrap();
      console.log(`${type} successful:`, result);
    } catch (err) {
      console.error('Error during submission:', err);
      if (err.data) {
        console.error('Server response data:', err.data);
      }
    }
  };
  
  useEffect(() => {
  if (registerIsSuccess && registerData) {
    toast.success(registerData.message || "Signup Successful!");
    setTimeout(() => {
    navigate('/');
    }, 2000);
  }
  if (loginIsSuccess && loginData) {
    toast.success(loginData.message || "Login Successful!");
    setTimeout(() => {
    navigate('/');
    }, 2000);
  }
    if (registerError) {
      const errorMessage = registerError.data?.message || registerError.message || "Signup Failed!";
      toast.error(errorMessage);
    }
    if (loginError) { 
      const errorMessage = loginError.data?.message || loginError.message || "Login Failed!";
      toast.error(errorMessage);
    }
    
  
},[loginIsLoading, registerIsLoading, loginData, registerData, loginError, registerError, loginIsSuccess, registerIsSuccess]);

  return (
    <>
    <br />
    <div className="flex justify-center w-full pt-12">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-[400px]"
      >
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
              <Button disabled={registerIsLoading} onClick={() => handleSubmit("signup")}>
                {registerIsLoading ? <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please wait...
                </>
                : "Signup"}
                
                </Button>
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
                  name="identifier"
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
              <Button disabled={loginIsLoading} onClick={() => handleSubmit("login")}>
                {loginIsLoading ? 
                <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please wait...
                </> : "Login"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
    </>
  );
};

export default Login;
