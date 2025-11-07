import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import { vi } from "vitest";
import UserDashboard from "./UserDashboard.jsx";

describe("🧪 Search Bar — UserDashboard", () => {
  beforeEach(() => {
    localStorage.setItem("user", JSON.stringify({ token: "dummyToken" }));

    // Mock notes data
    const mockNotes = [
      { id: 1, title: "Learn React", content: "Hooks, State, and Props" },
      { id: 2, title: "JavaScript Basics", content: "ES6 features and async" },
      { id: 3, title: "CSS Styling", content: "Flexbox, Grid, and Animations" },
    ];

    // Mock fetch for GET /notes
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockNotes),
      })
    );
  });

  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("filters notes correctly based on search input", async () => {
    render(
      <MemoryRouter>
        <UserDashboard />
      </MemoryRouter>
    );

    // Wait for mock notes to appear
    await waitFor(() => {
      expect(screen.getByText(/learn react/i)).toBeInTheDocument();
      expect(screen.getByText(/javascript basics/i)).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/search notes/i);

    // 🔍 Type "javascript"
    fireEvent.change(searchInput, { target: { value: "javascript" } });

    await waitFor(() => {
      expect(screen.getByText(/javascript basics/i)).toBeInTheDocument();
      expect(screen.queryByText(/learn react/i)).not.toBeInTheDocument();
    });

    // 🔄 Clear the input
    fireEvent.change(searchInput, { target: { value: "" } });

    await waitFor(() => {
      expect(screen.getByText(/learn react/i)).toBeInTheDocument();
      expect(screen.getByText(/javascript basics/i)).toBeInTheDocument();
    });
  });
});
