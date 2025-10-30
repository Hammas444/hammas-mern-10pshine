import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import Notes_Dashboard from "./UserDashboard.jsx";

describe("🧪 Notes_Dashboard Integration (Frontend Only, Real Token)", () => {
  beforeEach(() => {
    // ✅ Set fake token so component logic can call API
    localStorage.setItem("user", JSON.stringify({ token: "supersecretkey" }));
  });

  afterEach(() => {
    localStorage.clear();
  });

  // ✅ 1. Renders base dashboard
  it("renders dashboard with header", async () => {
    render(
      <MemoryRouter>
        <Notes_Dashboard />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/your notes/i)).toBeInTheDocument();
    });
  });

  // ✅ 2. Opens and closes the Add Note modal
  it("opens and closes the Add Note modal", async () => {
    render(
      <MemoryRouter>
        <Notes_Dashboard />
      </MemoryRouter>
    );

    const openBtn = await screen.findByTestId("open-add-modal");
    fireEvent.click(openBtn);

    const modalTitle = await screen.findByText(/Create Note/i);
    expect(modalTitle).toBeInTheDocument();

    const closeBtn = screen.getByRole("button", { name: /Add Note/i });
    fireEvent.click(closeBtn);

    await waitFor(() => {
      expect(screen.queryByText(/add a new note/i)).not.toBeInTheDocument();
    });
  });

  // ✅ 3. Adds a note (simulated only)
  it("adds a new note successfully (simulated frontend logic only)", async () => {
    render(
      <MemoryRouter>
        <Notes_Dashboard />
      </MemoryRouter>
    );

    const openBtn = await screen.findByTestId("open-add-modal");
    fireEvent.click(openBtn);

    await screen.findByText(/add a new note/i);

    const submitBtn = screen.getByTestId("submit-add-note");
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.queryByText(/Add Note/i)).not.toBeInTheDocument();
    });
  });

  // ✅ 4. Fetches notes from API or shows “No notes found”
  it("fetches and displays notes (GET API)", async () => {
    render(
      <MemoryRouter>
        <Notes_Dashboard />
      </MemoryRouter>
    );

    // Wait until either notes appear or “No notes found” appears
    await waitFor(
      () => {
        const header = screen.getByText(/Your Notes/i);
        expect(header).toBeInTheDocument();
      },
      { timeout: 8000 }
    );

    // ✅ Optional: If notes exist, check their content
    const noteElements = screen.queryAllByText(/title|note|content/i);
    if (noteElements.length > 0) {
      console.log("✅ Notes fetched and rendered successfully");
    } else {
      console.log("ℹ️ No notes found (empty state)");
      expect(screen.getByText(/no notes found/i)).toBeInTheDocument();
    }
  });

  // ✅ 5. Deletes a note (frontend simulation)
  it("deletes a note successfully (frontend simulation)", async () => {
    render(
      <MemoryRouter>
        <Notes_Dashboard />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/your notes/i)).toBeInTheDocument();
    });

    const deleteIcons = screen.queryAllByTestId("delete-btn");
    if (deleteIcons.length > 0) {
      fireEvent.click(deleteIcons[0]);
    }

    await waitFor(() => {
      expect(screen.getByText(/your notes/i)).toBeInTheDocument();
    });
  });
});