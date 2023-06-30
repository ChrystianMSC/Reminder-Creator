import { Navigate, createBrowserRouter } from "react-router-dom";
import About from "../pages/About";
import SeeReminders from "../pages/SeeReminders";
import NotFound from "../pages/NotFound";
import ReminderLayout from "../components/ReminderLayout";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import LoginLayout from "../components/LoginLayout";
import Create from "../pages/CreateReminder";

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
            {
                path: "/seeReminders/new",
                element: <Create key="createUser" />,
            },
            {
                path: "/seeReminders/:id",
                element: <Create key="userUpdate" />,
            },
            {
                path: "/seeReminders/newReminder",
                element: <Create key="createReminder" />,
            },
            {
                path: "/seeReminders/Reminder/:id",
                element: <Create key="reminderUpdate" />,
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
