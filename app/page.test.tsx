import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "./page";

describe("Home", () => {
  it("renders the placeholder home page without crashing", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { level: 1, name: "BetterContact" }),
    ).toBeInTheDocument();
  });

  it("lists the planned content hubs", () => {
    render(<Home />);

    expect(screen.getByText("Blog")).toBeInTheDocument();
    expect(screen.getByText("Case Study")).toBeInTheDocument();
  });
});
