import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import AuthForm from "./AuthForm";

// 🔹 Mock axios
vi.mock("axios");

// 🔹 Mock window.location to prevent navigation errors in jsdom
delete window.location;
window.location = { href: "" };

describe("AuthForm Component", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("renders Login form initially with correct input types", () => {
    render(<AuthForm />);

    const emailInput = screen.getByPlaceholderText("Enter email");
    const passwordInput = screen.getByPlaceholderText("Enter password");

    expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    // ✅ Check input types
    expect(emailInput).toHaveAttribute("type", "email");
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("toggles to Sign Up form when clicking 'Sign Up' and shows correct input types", async () => {
    const user = userEvent.setup();
    render(<AuthForm />);

    await user.click(screen.getByRole("button", { name: /sign up/i }));

    const nameInput = await screen.findByPlaceholderText("Your name");
    const emailInput = screen.getByPlaceholderText("Enter email");
    const passwordInput = screen.getByPlaceholderText("Enter password");

    expect(screen.getByRole("heading", { name: /sign up/i })).toBeInTheDocument();

    // ✅ Check input types
    expect(nameInput).toHaveAttribute("type", "text");
    expect(emailInput).toHaveAttribute("type", "email");
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("shows success message after successful signup", async () => {
    const user = userEvent.setup();
    render(<AuthForm />);

    await user.click(screen.getByRole("button", { name: /sign up/i }));
    await screen.findByPlaceholderText("Your name");

    axios.post.mockResolvedValueOnce({ data: { message: "Signup successful" } });

    await user.type(screen.getByPlaceholderText("Your name"), "Hamees");
    await user.type(screen.getByPlaceholderText("Enter email"), "test@example.com");
    await user.type(screen.getByPlaceholderText("Enter password"), "password123");
    await user.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => {
      expect(screen.getByText(/signup successful/i)).toBeInTheDocument();
    });
  });

  it("shows error message when login fails", async () => {
    const user = userEvent.setup();
    render(<AuthForm />);

    axios.post.mockRejectedValueOnce({
      response: { data: { message: "Invalid credentials" } },
    });

    await user.type(screen.getByPlaceholderText("Enter email"), "wrong@example.com");
    await user.type(screen.getByPlaceholderText("Enter password"), "wrongpass");
    await user.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });

  it("shows success message on successful login (and mock navigation)", async () => {
    const user = userEvent.setup();
    render(<AuthForm />);

    axios.post.mockResolvedValueOnce({
      data: { user: { username: "Hamees", email: "test@example.com" } },
    });

    await user.type(screen.getByPlaceholderText("Enter email"), "test@example.com");
    await user.type(screen.getByPlaceholderText("Enter password"), "password123");

    // ✅ Mock navigation
    const hrefSpy = vi.spyOn(window.location, "href", "set");

    await user.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(hrefSpy).toHaveBeenCalled();
    });
  });
});
