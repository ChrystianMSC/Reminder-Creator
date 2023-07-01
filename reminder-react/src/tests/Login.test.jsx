import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import Login from "../pages/Login";
import { BrowserRouter } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import "@testing-library/jest-dom";

test("full app rendering/navigating", async () => {
    render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    );

    // screen.debug();

    const expectedText = /Enter in your account/i;
    const getText = () => {
        try {
            screen.getByText(expectedText);
            return true;
        } catch {
            return false;
        }
    };

    expect(getText()).toBeTruthy();
});

test("fills input fields correctly", async () => {
    render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");

    const email = "test@example.com";
    const password = "password123";

    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });

    expect(emailInput.value).toBe(email);
    expect(passwordInput.value).toBe(password);
});

test("clicks login button", async () => {
    render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    );

    const loginButton = screen.getByRole("button", { name: /login/i });

    fireEvent.click(loginButton);
});

test("displays error messages", async () => {
    render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByRole("button", { name: /login/i });

    fireEvent.click(loginButton);

    // Verifying error messages
    const errorMessages2 = await screen.findAllByText(
        /The email field is required./i
    );
    const errorMessages1 = await screen.findAllByText(
        /The password field is required./i
    );
    expect(errorMessages1).toHaveLength(1);
    expect(errorMessages2).toHaveLength(1);
});
