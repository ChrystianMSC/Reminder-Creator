import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";
import { useEffect } from "react";

function ReminderLayout() {
    const { user, token, setToken, setUser, notification } = useStateContext();
    if (!token) {
        return <Navigate to="/login" />;
    }

    const onLogout = (event) => {
        event.preventDefault();
        axiosClient.post("/logout").then(() => {
            setToken(null);
        });
    };

    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    }, []);

    return (
        <div id="reminderLayout">
            <aside>
                <Link to="/seeReminders">See Reminders</Link>
                <Link to="/about">About</Link>
            </aside>
            <div className="content">
                <header>
                    <div>Header</div>
                    <div>
                        {user.name}
                        <a href="#" onClick={onLogout} className="btn-logout">
                            LogOut
                        </a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
            {notification && <div className="notification">{notification}</div>}
        </div>
    );
}

export default ReminderLayout;
