import { render, screen } from "@testing-library/react";
import React from "react";
import LoginLayout from "../components/LoginLayout";
import { BrowserRouter } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import "@testing-library/jest-dom";

test("full app rendering/navigating", async () => {
    render(
        <BrowserRouter>
            <LoginLayout />
        </BrowserRouter>
    );

    const expectedText = /Enter in your account/i;
    const getText = () => {
        try {
            screen.getByText(expectedText);
            return true;
        } catch {
            return false;
        }
    };

    expect(getText()).toBeFalsy();
});
