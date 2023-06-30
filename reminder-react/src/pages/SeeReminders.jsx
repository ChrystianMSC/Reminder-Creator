import { useEffect, useState } from "react";
import axiosClient from "../axios-client";

function SeeReminders() {
    const [users, setDates] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getDates();
    }, []);

    const getDates = () => {
        setLoading(true);
        axiosClient
            .get("/users")
            .then(({ data }) => {
                setLoading(false);
                console.log(data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    return <div>Reminder List</div>;
}

export default SeeReminders;
