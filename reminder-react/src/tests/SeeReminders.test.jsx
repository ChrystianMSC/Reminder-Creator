import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import SeeReminders from "../pages/SeeReminders";
import { BrowserRouter } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import "@testing-library/jest-dom";
import axiosClient from "../axios-client";

test("displays the reminder list header", () => {
    render(
        <BrowserRouter>
            <SeeReminders />
        </BrowserRouter>
    );

    expect(screen.getByText("Reminder List")).toBeInTheDocument();
});

test("displays loading message when data is being fetched", () => {
    vi.spyOn(axiosClient, "get").mockImplementationOnce(() => {
        return new Promise(() => {}); // Simulate a pending promise to mock loading
    });

    render(
        <BrowserRouter>
            <SeeReminders />
        </BrowserRouter>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
});

test("displays the correct number of reminders", async () => {
    vi.spyOn(axiosClient, "get").mockResolvedValueOnce({
        data: {
            data: [
                { id: 1, date: "2023-07-01", reminder: "Reminder 1" },
                { id: 2, date: "2023-07-02", reminder: "Reminder 2" },
            ],
        },
    });

    render(
        <BrowserRouter>
            <SeeReminders />
        </BrowserRouter>
    );

    const reminderRows = await screen.findAllByRole("row");

    expect(reminderRows.length).toBe(2);
});
