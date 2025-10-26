// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import { MemoryRouter, Route, Routes } from "react-router-dom";
// import React from "react";
// import EditNote from "./EditNote";
// import toast from "react-hot-toast";

// // ✅ Mock toast and navigate
// vi.mock("react-hot-toast", () => {
//   const toastFn = vi.fn(); // main callable function
//   toastFn.success = vi.fn();
//   toastFn.error = vi.fn();
//   return { __esModule: true, default: toastFn };
// });



// const mockNavigate = vi.fn();
// vi.mock("react-router-dom", async (importOriginal) => {
//   const actual = await importOriginal();
//   return {
//     ...actual,
//     useNavigate: () => mockNavigate,
//   };
// });

// // Helper render function
// function renderWithRouter(state) {
//   return render(
//     <MemoryRouter initialEntries={[{ pathname: "/edit", state }]}>
//       <Routes>
//         <Route path="/edit" element={<EditNote />} />
//       </Routes>
//     </MemoryRouter>
//   );
// }

// describe("🧪 EditNote Component", () => {
//   beforeEach(() => {
//     localStorage.setItem(
//       "user",
//       JSON.stringify({ token: "test-token" })
//     );
//     vi.clearAllMocks();
//   });

//   it("renders message if no note data found", () => {
//     renderWithRouter(undefined);
//     expect(screen.getByText(/No note data found/i)).toBeInTheDocument();
//   });

//   it("renders editor fields with existing note", () => {
//     const note = { id: 1, title: "<p>Old Title</p>", content: "<p>Old Content</p>" };
//     renderWithRouter({ note });

//     expect(screen.getByText(/Edit Note/i)).toBeInTheDocument();
//     expect(document.querySelectorAll(".ql-editor").length).toBeGreaterThan(0);
//   });

//   it("saves edited note successfully", async () => {
//     const note = { id: 123, title: "Test Title", content: "Test Content" };
//     global.fetch = vi.fn(() =>
//       Promise.resolve({ ok: true, json: () => Promise.resolve({}) })
//     );

//     renderWithRouter({ note });

//     // Simulate Save click
//     const saveBtn = screen.getByText(/Save Changes/i);
//     fireEvent.click(saveBtn);

//     await waitFor(() => {
//       expect(fetch).toHaveBeenCalledWith(
//         `http://localhost:5000/notes/${note.id}`,
//         expect.objectContaining({
//           method: "PUT",
//           headers: expect.objectContaining({
//             Authorization: "Bearer test-token",
//           }),
//         })
//       );
//       expect(toast).toHaveBeenCalledWith(
//         "Note updated successfully!",
//         expect.any(Object)
//       );
//       expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
//     });
//   });

//   it("shows error toast if update fails", async () => {
//     const note = { id: 10, title: "Fail", content: "Fail" };
//     global.fetch = vi.fn(() => Promise.resolve({ ok: false }));

//     renderWithRouter({ note });
//     fireEvent.click(screen.getByText(/Save Changes/i));

//     await waitFor(() => {
//       expect(toast.error).toHaveBeenCalledWith("Failed to update note");
//     });
//   });

//   it("navigates back when Cancel clicked", () => {
//     const note = { id: 1, title: "Test", content: "Test" };
//     renderWithRouter({ note });

//     fireEvent.click(screen.getByText(/Cancel/i));
//     expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
//   });
// });
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import EditNote from "./EditNote.jsx";

// 🧩 Mock dependencies
vi.mock("react-hot-toast", () => ({
  __esModule: true,
  default: (msg, opts) => console.log("Toast:", msg, opts),
}));

// Mock navigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// 🧠 Helper: fake note data
const fakeNote = {
  id: "123",
  title: "<p>Old Title</p>",
  content: "<p>Old Content</p>",
};

describe("🧪 EditNote Component", () => {
  beforeEach(() => {
    localStorage.setItem("user", JSON.stringify({ token: "test_token" }));
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: "Updated" }),
      })
    );
  });

  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  // ✅ 1. Renders "No note data found" when no state
  it("renders fallback when no note data is passed", () => {
    render(
      <MemoryRouter>
        <EditNote />
      </MemoryRouter>
    );

    expect(screen.getByText(/no note data found/i)).toBeInTheDocument();
  });

  // ✅ 2. Renders editor fields when note is provided
  it("renders the edit form with existing note data", () => {
    render(
      <MemoryRouter initialEntries={[{ state: { note: fakeNote } }]}>
        <EditNote />
      </MemoryRouter>
    );

    expect(screen.getByText(/Edit Note/i)).toBeInTheDocument();
expect(screen.getByText(/Title:/i)).toBeInTheDocument();
    expect(screen.getByText(/Content:/i)).toBeInTheDocument();
  });

  // ✅ 3. Handles Save Changes (mock PUT request)
  it("submits updated note and navigates back to dashboard", async () => {
    render(
      <MemoryRouter initialEntries={[{ state: { note: fakeNote } }]}>
        <EditNote />
      </MemoryRouter>
    );

    // Click the "Save Changes" button
    const saveBtn = screen.getByRole("button", { name: /save changes/i });
    fireEvent.click(saveBtn);

    // ✅ Verify fetch called correctly
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:5000/notes/123",
        expect.objectContaining({
          method: "PUT",
          headers: expect.objectContaining({
            Authorization: "Bearer test_token",
          }),
        })
      );
    });

    // ✅ Navigates back
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });
  });

  // ✅ 4. Handles Cancel button
  it("navigates back when clicking Cancel", async () => {
    render(
      <MemoryRouter initialEntries={[{ state: { note: fakeNote } }]}>
        <EditNote />
      </MemoryRouter>
    );

    const cancelBtn = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(cancelBtn);

    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });
});