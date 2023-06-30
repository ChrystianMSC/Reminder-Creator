import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";

function SeeReminders() {
    const [date, setDate] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getDate();
    }, []);

    const getDate = () => {
        setLoading(true);
        axiosClient
            .get("/reminder")
            .then(({ data }) => {
                setLoading(false);
                setDate(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const onDeleteClick2 = (date) => {
        if (!window.confirm("Are you sure you want to delete this reminder?")) {
            return;
        }
        axiosClient.delete(`/reminder/${date.id}`).then(() => {
            // setNotification("User was successfully deleted");
            getDate();
        });
    };

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h1>Reminder List</h1>
                <Link className="btn-add" to="/seeReminders/newReminder">
                    Add new Reminder
                </Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>reminders</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {loading && (
                        <tbody>
                            <tr>
                                <td colSpan="4" className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        </tbody>
                    )}
                    {!loading && (
                        <tbody>
                            {date.map((u) => (
                                <tr key={u.id}>
                                    <td>{u.id}</td>
                                    <td>{u.date}</td>
                                    <td>{u.reminder}</td>
                                    <td>
                                        <Link
                                            className="btn-edit"
                                            to={
                                                "/seeReminders/Reminder/" + u.id
                                            }
                                        >
                                            Edit
                                        </Link>
                                        &nbsp;
                                        <button
                                            className="btn-delete"
                                            onClick={(ev) => onDeleteClick2(u)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
}

export default SeeReminders;
