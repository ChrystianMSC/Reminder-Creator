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

    const onDeleteClick2 = (reminder) => {
        if (!window.confirm("Are you sure you want to delete this reminder?")) {
            return;
        }
        axiosClient.delete(`/reminder/${reminder.id}`).then(() => {
            getDate();
        });
    };

    // Merge rows with the same date
    const mergedData = [];
    date.forEach((u) => {
        const existingRow = mergedData.find((row) => row.date === u.date);
        if (existingRow) {
            existingRow.reminders.push({ id: u.id, reminder: u.reminder });
        } else {
            mergedData.push({
                id: u.id,
                date: u.date,
                reminders: [{ id: u.id, reminder: u.reminder }],
            });
        }
    });

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
                            <th>Reminders</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="4" className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        ) : (
                            mergedData.map((row) => (
                                <tr key={row.id}>
                                    <td>{row.id}</td>
                                    <td>{row.date}</td>
                                    <td>
                                        <ul>
                                            {row.reminders.map((reminder) => (
                                                <li key={reminder.id}>
                                                    {reminder.reminder}
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td>
                                        {row.reminders.map((reminder) => (
                                            <div key={reminder.id}>
                                                <Link
                                                    className="btn-edit"
                                                    to={`/seeReminders/Reminder/${reminder.id}`}
                                                >
                                                    Edit
                                                </Link>
                                                &nbsp;
                                                <button
                                                    className="btn-delete"
                                                    onClick={() =>
                                                        onDeleteClick2(reminder)
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        ))}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SeeReminders;
