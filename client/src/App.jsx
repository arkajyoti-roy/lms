import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./pages/Login";
import MainLayout from "./layout/MainLayout";
import Courses from "./pages/student/Courses";
import MyLearning from "./pages/student/MyLearning";
import Profile from "./pages/student/Profile";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      }
      ,
      {
        path: "/courses",
        element: <Courses />,
      }
      ,
      {
        path: "/profile",
        element: <Profile />,
      }
      ,
      {
        path: "/my-learning",
        element: <MyLearning />,
      }
    ],
  },
]);

const App = () => {
  return (
    <main>
      <RouterProvider router={appRouter} />
      {/* <Courses /> */}
    </main>
  );
};

export default App;