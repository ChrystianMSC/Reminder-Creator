import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

function Create() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const { setNotification } = useStateContext;
    const [date, setDate] = useState({
        id: null,
        date: [],
        reminder: "",
    });

    const onSubmit2 = (ev) => {
        ev.preventDefault();
        if (date.id) {
            axiosClient
                .put(`/reminder/${date.id}`, date)
                .then(() => {
                    navigate("/seeReminders");
                    setNotification("Reminder successfully updated");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status == 422) {
                        setErrors(response.data.errors);
                    }
                });
        } else {
            console.log(date);
            axiosClient
                .post(`/reminder`, date)
                .then(() => {
                    navigate("/seeReminders");
                    setNotification("Reminder successfully created");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status == 422) {
                        setErrors(response.data.errors);
                    }
                });
        }
    };

    if (id) {
        useEffect(() => {
            setLoading(true);
            axiosClient
                .get(`/reminder/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setDate(data);
                })
                .catch(() => {
                    setLoading(false);
                });
        }, []);
    }

    return (
        <>
            <div>
                {date.id && <h1>Update Reminder: {date.date}</h1>}
                {!date.id && <h1>New Reminder</h1>}
                <div className="card animated fadeInDown">
                    {loading && <div className="text-center">Loading...</div>}
                    {errors && (
                        <div className="alert">
                            {Object.keys(errors).map((key) => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    )}
                    {!loading && (
                        <form onSubmit={onSubmit2}>
                            <input
                                type="date"
                                value={date.date}
                                onChange={(ev) =>
                                    setDate({ ...date, date: ev.target.value })
                                }
                                placeholder="Date"
                            />
                            <input
                                value={date.reminder}
                                onChange={(ev) =>
                                    setDate({
                                        ...date,
                                        reminder: ev.target.value,
                                    })
                                }
                                placeholder="Reminder"
                            />
                            <button className="btn">Save</button>
                        </form>
                    )}
                </div>
            </div>
        </>
    );
}

export default Create;
