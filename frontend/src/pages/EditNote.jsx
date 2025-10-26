// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import ReactQuill from "react-quill-new";
// import "react-quill-new/dist/quill.snow.css";

// const EditNote = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user"));

//   // get note from state
//   const { note } = location.state || {};
//   const [editedNote, setEditedNote] = useState({
//     title: note?.title || "",
//     content: note?.content || "",
//   });

//   if (!note) {
//     return <p className="text-center mt-10">No note data found.</p>;
//   }

//   // Handle save
//   const handleSave = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(`http://localhost:5000/notes/${note.id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${user.token}`,
//         },
//         body: JSON.stringify(editedNote),
//       });

//       if (!res.ok) throw new Error("Failed to update note");

//       alert("Note updated successfully!");
//       navigate("/dashboard");
//     } catch (err) {
//       console.error("Update failed:", err);
//     }
//   };

//   return (


//     <>
    
//     <br />
//     <br />
//     <br />
//     <br />
//     <br/>
    
//     <div className="p-6 max-w-2xl mx-auto">
//       <h2 className="text-xl font-bold mb-4">Edit Note</h2>
//       <form onSubmit={handleSave}>
//         <h3 className="text-black mb-2">Title</h3>
//         <ReactQuill
//           theme="snow"
//           value={editedNote.title}
//           onChange={(value) => setEditedNote({ ...editedNote, title: value })}
//           className="bg-white rounded mb-3"
//         />
//         <h3 className="text-black mb-2">Content</h3>
//         <ReactQuill
//           theme="snow"
//           value={editedNote.content}
//           onChange={(value) => setEditedNote({ ...editedNote, content: value })}
//           className="bg-white rounded mb-4"
//         />
//         <div className="flex gap-3">
//           <button
//             type="submit"
//             className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//           >
//             Save
//           </button>
//           <button
//             type="button"
//             onClick={() => navigate("/dashboard")}
//             className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//     </>

//   );
// };

// export default EditNote;
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import toast from "react-hot-toast";

const EditNote = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // get note from state
  const { note } = location.state || {};
  const [editedNote, setEditedNote] = useState({
    title: note?.title || "",
    content: note?.content || "",
  });

  if (!note) {
    return <p className="text-center mt-10">No note data found.</p>;
  }

  // Handle save
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/notes/${note.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(editedNote),
      });

      if (!res.ok) toast.error("Failed to update note");

      toast("Note updated successfully!",{style:{background:"#2C5364",color:"#fff"}});
      navigate("/dashboard");
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl transition-all">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Edit Note
        </h2>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Title Field */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Title:
            </label>
            <ReactQuill
              theme="snow"
              value={editedNote.title}
              onChange={(value) => setEditedNote({ ...editedNote, title: value })}
              className="bg-white rounded-lg border border-gray-300 shadow-sm"
            />
          </div>

          {/* Content Field */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Content:
            </label>
            <ReactQuill
              theme="snow"
              value={editedNote.content}
              onChange={(value) =>
                setEditedNote({ ...editedNote, content: value })
              }
              className="bg-white rounded-lg border border-gray-300 shadow-sm"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 justify-center pt-4">
            <button
              type="submit"
              className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition font-semibold"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="flex-1 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400 transition font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNote;
