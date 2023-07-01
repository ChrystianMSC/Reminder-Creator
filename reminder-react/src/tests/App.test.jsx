import { describe, test } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";
describe("Teste", () => {
    test("title", () => {});
    test("Testando render", () => {
        const Aaplic = render(<App />);
        expect(Aaplic).toBeTruthy();
    });
});
