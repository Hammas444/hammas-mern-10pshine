import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Profile from "./Profile.jsx";

const mockNavigate = vi.fn();

// Mock react-router hooks
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock fetch globally
global.fetch = vi.fn();

// Mock alert
global.alert = vi.fn();

describe("🧪 Profile Component", () => {
  beforeEach(() => {
    vi.resetAllMocks();

    // Mock user in localStorage
    localStorage.setItem(
      "user",
      JSON.stringify({
        token: "fake_token",
        user: {
          id: 1,
          username: "john_doe",
          email: "john@example.com",
        },
      })
    );
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("renders user info in view mode", async () => {
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );

    // Wait for useEffect to load user data
    await waitFor(() =>
      expect(screen.getByText("john_doe")).toBeInTheDocument()
    );
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Edit Your Profile/i })).toBeInTheDocument();
  });

  it("switches to edit mode when clicking 'Edit Your Profile'", async () => {
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );

    const editButton = await screen.findByRole("button", {
      name: /Edit Your Profile/i,
    });
    fireEvent.click(editButton);

    expect(await screen.findByText(/Edit Profile/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Username/i)).toHaveValue("john_doe");
    expect(screen.getByLabelText(/Email/i)).toHaveValue("john@example.com");
  });

  it("submits updated profile data successfully", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        username: "new_user",
        email: "new@example.com",
      }),
    });

    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );

    // Switch to edit mode
    fireEvent.click(await screen.findByRole("button", { name: /Edit Your Profile/i }));

    // Change fields
    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: "new_user" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "new@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "newpass123" },
    });

    // Submit form
    fireEvent.click(screen.getByRole("button", { name: /Save Changes/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:5000/auth/updateUser/1",
        expect.objectContaining({
          method: "PUT",
          headers: expect.objectContaining({
            Authorization: "Bearer fake_token",
          }),
        })
      );
    });

    expect(global.alert).toHaveBeenCalledWith("Profile updated successfully!");
    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });

  it("returns to view mode when clicking Cancel", async () => {
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );

    fireEvent.click(await screen.findByRole("button", { name: /Edit Your Profile/i }));
    fireEvent.click(screen.getByRole("button", { name: /Cancel/i }));

    expect(await screen.findByText("john_doe")).toBeInTheDocument();
  });
});