import { render, screen } from "@testing-library/react";
import React from "react";
import ReminderLayout from "../components/ReminderLayout";
import { BrowserRouter } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import "@testing-library/jest-dom";

test("render", async () => {
    render(
        <BrowserRouter>
            <ReminderLayout />
        </BrowserRouter>
    );
    const expectedText = /Header/i;
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
