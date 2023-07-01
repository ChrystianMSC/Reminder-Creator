import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import Signup from "../pages/Signup";
import { BrowserRouter } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import "@testing-library/jest-dom";
import axiosClient from "../axios-client";

test("full app rendering/navigating", async () => {
    test("renders without errors", () => {
        render(
            <BrowserRouter>
                <Signup />
            </BrowserRouter>
        );
    });
});

test("submits the form correctly", async () => {
    const mockPost = vi.spyOn(axiosClient, "post").mockResolvedValueOnce({
        data: {
            user: { id: 1, name: "John Doe" },
            token: "abc123",
        },
    });

    render(
        <BrowserRouter>
            <Signup />
        </BrowserRouter>
    );

    const nameInput = screen.getByPlaceholderText("Full Name");
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const passwordConfirmationInput = screen.getByPlaceholderText(
        "Password Confirmation"
    );
    const signupButton = screen.getByRole("button", { name: /Signup/i });

    await fireEvent.input(nameInput, { target: { value: "John Doe" } });
    await fireEvent.input(emailInput, {
        target: { value: "johndoe@example.com" },
    });
    await fireEvent.input(passwordInput, { target: { value: "password123@" } });
    await fireEvent.input(passwordConfirmationInput, {
        target: { value: "password123@" },
    });

    await fireEvent.submit(signupButton);

    await waitFor(() => {
        expect(mockPost).toHaveBeenCalledWith("/signup", {
            name: "John Doe",
            email: "johndoe@example.com",
            password: "password123@",
            password_confirmation: "password123@",
        });
    });
});

test("displays error messages", async () => {
    render(
        <BrowserRouter>
            <Signup />
        </BrowserRouter>
    );

    const signupButton = screen.getByRole("button", { name: /signup/i });

    fireEvent.click(signupButton);

    const errorMessages1 = await screen.findAllByText(
        /The name field is required./i
    );
    const errorMessages2 = await screen.findAllByText(
        /The email field is required./i
    );
    const errorMessages3 = await screen.findAllByText(
        /The password field is required./i
    );
    expect(errorMessages1).toHaveLength(1);
    expect(errorMessages2).toHaveLength(1);
    expect(errorMessages3).toHaveLength(1);
});
