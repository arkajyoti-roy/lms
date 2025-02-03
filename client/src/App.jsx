import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./pages/Login";
import MainLayout from "./layout/MainLayout";
import Courses from "./pages/student/Courses";
import MyLearning from "./pages/student/MyLearning";
import Profile from "./pages/student/Profile";
import Slidebar from "./pages/Admin/Sidebar.jsx";
import CourseTable from "./pages/Admin/course/CourseTable";
import Dashboard from "./pages/Admin/Dashboard";
import AddCourse from "./pages/Admin/course/AddCourse";
import ProtectedRoute from "./components/ProtectedRoute";
import InsProfile from "./pages/Admin/InsProfile";

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
        element: (
          <ProtectedRoute allowedRoles={["student"]}>
            <Courses />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute allowedRoles={["student"]}>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/my-learning",
        element: (
          <ProtectedRoute allowedRoles={["student"]}>
            <MyLearning />
          </ProtectedRoute>
        ),
      },
         // Test route for CourseTable
         {
          path: "/test-course-table",
          element: <CourseTable />,
        },

      // Admin Routes
      {
        path: "admin",
        element: (
          <ProtectedRoute allowedRoles={["instructor"]}>
            <Slidebar />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "ins-profile",
            element: <InsProfile />,
          },
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "course",
            element: <CourseTable />,
          },
          {
            path: "course/create",
            element: <AddCourse />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <main>
      <RouterProvider router={appRouter} />
 
    </main>
  );
};

export default App;
