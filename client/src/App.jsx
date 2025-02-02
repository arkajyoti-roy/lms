import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./pages/Login";
import MainLayout from "./layout/MainLayout";
import Courses from "./pages/student/Courses";
import MyLearning from "./pages/student/MyLearning";
import Profile from "./pages/student/Profile";
import Slidebar from "./pages/Admin/Sidebar.jsx";
// import Dashboard from "./pages/Admin/Dashboard";
// import AddCourse from "./pages/Admin/course/AddCourse";
import CourseTable from "./pages/Admin/course/CourseTable";
import Dashboard from "./pages/Admin/Dashboard";
import AddCourse from "./pages/Admin/course/AddCourse";

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
      },
      {
        path: "/courses",
        element: <Courses />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/my-learning",
        element: <MyLearning />,
      },

      // Admin____________________________----------------------

      {
        path: "admin",
        element: <Slidebar />,
        children:[
          {
            path: "dashboard",
            element: <Dashboard />
          },
          {
            path: "course",
            element: <CourseTable />
           
          }
          ,
          {
            path: "course/create",
            element: <AddCourse />
           
          }
        ]
      },
    ],
  },
]);

const App = () => {
  return (
    <main>
      <RouterProvider router={appRouter} />

      {/* <CourseTable /> */}
    </main>
  );
};

export default App;
