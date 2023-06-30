import { Navigate, createBrowserRouter } from "react-router-dom";
import About from "../pages/About";
import SeeReminders from "../pages/SeeReminders";
import NotFound from "../pages/NotFound";
import ReminderLayout from "../components/ReminderLayout";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import LoginLayout from "../components/LoginLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <ReminderLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/seeReminders" />,
            },
            {
                path: "/seeReminders",
                element: <SeeReminders />,
            },
            {
                path: "/about",
                element: <About />,
            },
        ],
    },
    {
        path: "/",
        element: <LoginLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
