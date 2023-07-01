import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import Create from "../pages/CreateReminder";
import { BrowserRouter } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import "@testing-library/jest-dom";
import axiosClient from "../axios-client";

vi.mock("../axios-client");

test("renders the component", () => {
    render(
        <BrowserRouter>
            <Create />
        </BrowserRouter>
    );

    expect(screen.getByText("New Reminder")).toBeInTheDocument();
});

test("submits the form with valid data and creates a new reminder", async () => {
    const mockPost = vi.spyOn(axiosClient, "post").mockResolvedValueOnce({
        data: {
            user: { id: 1, name: "John Doe" },
            token: "abc123",
        },
    });

    render(
        <BrowserRouter>
            <Create />
        </BrowserRouter>
    );

    const dateInput = screen.getByPlaceholderText("Date");
    const reminderInput = screen.getByPlaceholderText("Reminder");
    const saveButton = screen.getByRole("button", { name: /save/i });

    await fireEvent.input(dateInput, { target: { value: "2023-07-01" } });
    await fireEvent.input(reminderInput, {
        target: { value: "Test reminder" },
    });

    await fireEvent.click(saveButton);

    await waitFor(() => {
        expect(mockPost).toHaveBeenCalledWith("/reminder", {
            id: null,
            date: "2023-07-01",
            reminder: "Test reminder",
        });
    });
});
