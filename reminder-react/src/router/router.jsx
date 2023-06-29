import { createBrowserRouter } from "react-router-dom";
import About from "../pages/About";
import SeeReminders from "../pages/SeeReminders";
import CreateReminder from "../pages/CreateReminder";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
    {
        path: "/about",
        element: <About />,
    },
    {
        path: "/seeReminders",
        element: <SeeReminders />,
    },
    {
        path: "/createReminder",
        element: <CreateReminder />,
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
