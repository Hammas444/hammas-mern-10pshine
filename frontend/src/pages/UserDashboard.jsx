// import React, { useEffect, useState } from "react";
// import { FaEdit, FaTrash, FaSave, FaTimes, FaPlus } from "react-icons/fa";
// import "../index.css";
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import ReactQuill from "react-quill-new";
// import "react-quill-new/dist/quill.snow.css";
// import { Link } from "react-router-dom";

// const UserDashboard = () => {
//   const [notes, setNotes] = useState([]);
//   const [newNote, setNewNote] = useState({ title: "", content: "" });
//   const [editingNote, setEditingNote] = useState(null);
//  const [show, setShow] = useState(false);
 
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

// const user = JSON.parse(localStorage.getItem('user'));

//   useEffect(() => {
//     if (!user?.token) return;

//     const fetchNotes = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/notes", {
//           headers: { Authorization: `Bearer ${user.token}` },
//         });
//         if (!res.ok) throw new Error("Failed to fetch notes");
//         const data = await res.json();
//         setNotes(data);
//       } catch (err) {
//         console.error("Failed to load notes:", err);
//       }
//     };

//     fetchNotes();
//   }, [user.token]);

//   const handleAddNote = async (e) => {
//     e.preventDefault();
//     if (!newNote.title || !newNote.content)
//       return alert("Please fill all fields.");

//     try {
//       const res = await fetch("http://localhost:5000/notes", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${user.token}`,
//         },
//         body: JSON.stringify(newNote),
//       });
//       if (!res.ok) throw new Error("Failed to add note");
//       const data = await res.json();
//       setNotes([data, ...notes]);
//       setNewNote({ title: "", content: "" });
//     } catch (err) {
//       console.error("Add note failed:", err);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await fetch(`http://localhost:5000/notes/${id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${user.token}` },
//       });
//       setNotes(notes.filter((note) => note.id !== id));
//     } catch (err) {
//       console.error("Delete failed:", err);
//     }
//   };

//   const handleEdit = (note) => setEditingNote({ ...note });

//   const handleSaveEdit = async (id) => {
//     try {
//       const res = await fetch(`http://localhost:5000/notes/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${user.token}`,
//         },
//         body: JSON.stringify({
//           title: editingNote.title,
//           content: editingNote.content,
//         }),
//       });

//       if (!res.ok) throw new Error("Failed to update note");
//       const updated = await res.json();
//       setNotes(notes.map((n) => (n.id === id ? updated : n)));
//       setEditingNote(null);
//     } catch (err) {
//       console.error("Edit failed:", err);
//     }
//   };

//   const handleCancelEdit = () => setEditingNote(null);
 


//   return (
//     <div className="min-h-screen  px-6 py-8">
  


//   <button 
//       data-testid="open-add-modal"
//       className="fixed bottom-6  right-6 bg-blue-500 text-white p-4 rounded-2 shadow-lg hover:bg-blue-600 transition duration-300 flex items-center justify-center"
//       title="Add a New Note"
//        onClick={handleShow}
//     >
//       Add
//     </button>



 

//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Create Note</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//            <form
//         onSubmit={handleAddNote}
//         className="bg-white p-6 rounded-lg shadow-md mb-8"
//       >
//         <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
//            Add a New Note
//         </h2>
//         {/* <input
//           type="text"
//           placeholder="Title"
//           value={newNote.title}
//           onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
//           className="w-full p-3 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//         /> */}

//         <ReactQuill
//           theme="snow"
//           value={newNote.title}
//           onChange={(e) => setNewNote({ ...newNote, title: e })}
//           className="bg-white mb-6"
//           placeholder="Add Note Title..."
//         />



//          <ReactQuill
//           theme="snow"
//           value={newNote.content}
//           onChange={(e) => setNewNote({ ...newNote, content: e })}
//           className="bg-white mb-6"
//           placeholder="Create your note..."
//         />

       
//         <button 
//           data-testid="submit-add-note"
//           type="submit"
//           className="bg-blue-500 border-0 h-9  hover:bg-gray-500 hover:text-gray-950 text-white px-5 py-2 rounded-2 font-medium shadow transition"
//           onClick={handleClose}
//         >
//           Add Note
//         </button>
//       </form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="danger" onClick={handleClose}>
//             Close
//           </Button>
         
//         </Modal.Footer>
//       </Modal>




//       {/* Notes List */}
//       <br /><br />

//       {notes.length === 0 ? (
//         <div className="flex flex-col items-center justify-center h-screen text-center">
//         <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Notes</h2>
//         <p className="text-gray-500 text-center justify-center items-center italic">
//           No notes found. Start by adding one above!
//         </p>
//         </div>
//       ) : (
//         <div className="grid md:grid-cols-2 gap-4">
//           {notes.map((note) => (
//             <div
//               key={note.id}
//               className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition border border-gray-100"
//             >
//               {editingNote && editingNote.id === note.id ? (
//                 <>
                 

//                    <ReactQuill
//           theme="snow"
//           value={editingNote.title}
//           onChange={(e) => setEditingNote({ ...editingNote, title: e })}     
//           className="bg-white mb-6"
//           placeholder="Edit your note title..."
//         />


//           <ReactQuill
//           theme="snow"
//           value={editingNote.content}
//           onChange={(e) => setEditingNote({ ...editingNote, content: e })} 
//           className="bg-white mb-6"
//           placeholder="Edit your note content..."
//         />  


            


//                   <div className="flex gap-2 justify-end">
//                     <button
//                       onClick={() => handleSaveEdit(note.id)}
//                       className="bg-green-600 border-0 h-9  hover:bg-green-700 hover:text-gray-950 text-white px-5 py-2 rounded-2 font-medium shadow transition"
//                     >
//                      Save
//                     </button>
//                     <button
//                       onClick={handleCancelEdit}
//                       className="bg-gray-950 border-0 h-9  hover:bg-gray-500 hover:text-gray-950 text-white px-5 py-2 rounded-2 font-medium shadow transition"
//                     >
//                        Cancel
//                     </button>
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <div>
//                     <h3 dangerouslySetInnerHTML={{ __html: note.title }} className="text-lg font-semibold text-gray-800 mb-1">
                    
//                     </h3>
//                       <div
//                           className="text-gray-700 text-sm"
//                           dangerouslySetInnerHTML={{ __html: note.content }}
//                             /> </div>
//                   <div className="flex gap-3 justify-center mt-3">
//                    <Link to="/edit" state={{ note }}>
//                       <button
//                       className="bg-blue-500 border-0 h-9  hover:bg-blue-600 hover:text-gray-950 text-white px-5 py-2 rounded-2 font-medium shadow transition"
//                        >
//                       Edit
//                     </button>                    </Link>
//                     <button
//                       onClick={() => handleDelete(note.id)}
//                       className="bg-gray-950 border-0 h-9  hover:bg-gray-500 hover:text-gray-950 text-white px-5 py-2 rounded-2 font-medium shadow transition"
//                     >
//                       Delete
//                     </button>

//                   </div>
//                 </>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserDashboard;


// import React, { useEffect, useState } from "react";
// import { FaEdit, FaTrash, FaSave, FaTimes, FaPlus, FaSearch } from "react-icons/fa";
// import "../index.css";
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import ReactQuill from "react-quill-new";
// import "react-quill-new/dist/quill.snow.css";
// import { Link } from "react-router-dom";
// import toast from "react-hot-toast";

// const UserDashboard = () => {
//   const [notes, setNotes] = useState([]);
//   const [filteredNotes, setFilteredNotes] = useState([]); // ✅ for search results
//   const [searchQuery, setSearchQuery] = useState(""); // ✅ search input
//   const [newNote, setNewNote] = useState({ title: "", content: "" });
//   const [editingNote, setEditingNote] = useState(null);
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const user = JSON.parse(localStorage.getItem("user"));

//   useEffect(() => {
//     if (!user?.token) return;

//     const fetchNotes = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/notes", {
//           headers: { Authorization: `Bearer ${user.token}` },
//         });
//         if (!res.ok) throw new Error("Failed to fetch notes");
//         const data = await res.json();
//         setNotes(data);
//         setFilteredNotes(data); // ✅ initialize
//       } catch (err) {
//         console.error("Failed to load notes:", err);
//       }
//     };

//     fetchNotes();
//   }, [user.token]);

//   // ✅ Live search filtering
//   useEffect(() => {
//     const filtered = notes.filter((note) => {
//       const query = searchQuery.toLowerCase();
//       const titleMatch = note.title?.toLowerCase().includes(query);
//       const contentMatch = note.content
//         ?.replace(/<[^>]+>/g, "") // remove HTML tags
//         .toLowerCase()
//         .includes(query);
//       return titleMatch || contentMatch;
//     });
//     setFilteredNotes(filtered);
//   }, [searchQuery, notes]);

//   const handleAddNote = async (e) => {
//     e.preventDefault();
//     if (!newNote.title || !newNote.content)
//       return toast.error("Please fill all fields.");

//     try {
//       const res = await fetch("http://localhost:5000/notes", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${user.token}`,
//         },
//         body: JSON.stringify(newNote),
//       });
//       if (!res.ok) throw new Error("Failed to add note");
//       const data = await res.json();
//       toast.success("Note added successfully!");
//       setNotes([data, ...notes]);
//       setNewNote({ title: "", content: "" });
//       handleClose();
//     } catch (err) {
//       console.error("Add note failed:", err);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await fetch(`http://localhost:5000/notes/${id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${user.token}` },
//       });
//       setNotes(notes.filter((note) => note.id !== id));
//       toast.success("Note deleted successfully!");
//     } catch (err) {
//       console.error("Delete failed:", err);
//     }
//   };

//   const handleEdit = (note) => setEditingNote({ ...note });

//   const handleSaveEdit = async (id) => {
//     try {
//       const res = await fetch(`http://localhost:5000/notes/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${user.token}`,
//         },
//         body: JSON.stringify({
//           title: editingNote.title,
//           content: editingNote.content,
//         }),
//       });

//       if (!res.ok) throw new Error("Failed to update note");
//       const updated = await res.json();
//       setNotes(notes.map((n) => (n.id === id ? updated : n)));
//       setEditingNote(null);
//     } catch (err) {
//       console.error("Edit failed:", err);
//     }
//   };

//   const handleCancelEdit = () => setEditingNote(null);

//   return (
//     <div className="min-h-screen px-6 py-8">
//       {/* ➕ Floating Add Button */}
//       <button
//         data-testid="open-add-modal"
//         className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-2 shadow-lg hover:bg-blue-600 transition duration-300 flex items-center justify-center"
//         title="Add a New Note"
//         onClick={handleShow}
//       >
//         Add
//       </button>

//       {/* 🧾 Modal for Adding Note */}
//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Create Note</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <form
//             onSubmit={handleAddNote}
//             className="bg-white p-6 rounded-lg shadow-md mb-8"
//           >
//             <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
//               Add a New Note
//             </h2>

//             <ReactQuill
//               theme="snow"
//               value={newNote.title}
//               onChange={(e) => setNewNote({ ...newNote, title: e })}
//               className="bg-white mb-6"
//               placeholder="Add Note Title..."
//             />

//             <ReactQuill
//               theme="snow"
//               value={newNote.content}
//               onChange={(e) => setNewNote({ ...newNote, content: e })}
//               className="bg-white mb-6"
//               placeholder="Create your note..."
//             />

//             <button
//               data-testid="submit-add-note"
//               type="submit"
//               className="bg-blue-500 border-0 h-9 hover:bg-gray-500 hover:text-gray-950 text-white px-5 py-2 rounded-2 font-medium shadow transition"
//               onClick={handleClose}
//             >
//               Add Note
//             </button>
//           </form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="danger" onClick={handleClose}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>

// <br />
// <br />
// <br />
//       {/* 🔍 Search Bar */}
//      <center>
//        <div className="flex justify-center items-center mb-6 bg-gray-100 rounded-lg p-2 shadow-sm h-13 w-full md:w-1/2">
//         <FaSearch className="text-gray-500 mx-2 size-4" />
//         <input
//           type="text"
//           placeholder="Search notes..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="flex-1 bg-transparent outline-none text-gray-700 "
//         />
//       </div>
//       </center>


// <br />
// <br />
// <br />

//       {/* 🗂 Notes List */}
//       {filteredNotes.length === 0 ? (
//         <div className="flex flex-col items-center justify-center h-screen text-center">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">
//             Your Notes
//           </h2>
//           <p className="text-gray-500 italic">
//             No notes found. Try a different search or add a new one!
//           </p>
//         </div>
//       ) : (
//         <div className="grid md:grid-cols-2 gap-4">
//           {filteredNotes.map((note) => (
//             <div
//               key={note.id}
//               className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition border border-gray-100"
//             >
//               {editingNote && editingNote.id === note.id ? (
//                 <>
//                   <ReactQuill
//                     theme="snow"
//                     value={editingNote.title}
//                     onChange={(e) => setEditingNote({ ...editingNote, title: e })}
//                     className="bg-white mb-6"
//                     placeholder="Edit your note title..."
//                   />
//                   <ReactQuill
//                     theme="snow"
//                     value={editingNote.content}
//                     onChange={(e) =>
//                       setEditingNote({ ...editingNote, content: e })
//                     }
//                     className="bg-white mb-6"
//                     placeholder="Edit your note content..."
//                   />
//                   <div className="flex gap-2 justify-end">
//                     <button
//                       onClick={() => handleSaveEdit(note.id)}
//                       className="bg-green-600 h-9 hover:bg-green-700 text-white px-5 py-2 rounded-2 font-medium shadow transition"
//                     >
//                       Save
//                     </button>
//                     <button
//                       onClick={handleCancelEdit}
//                       className="bg-gray-950 h-9 hover:bg-gray-500 text-white px-5 py-2 rounded-2 font-medium shadow transition"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <div>
//                     <h3
//                       dangerouslySetInnerHTML={{ __html: note.title }}
//                       className="text-lg font-semibold text-gray-800 mb-1"
//                     ></h3>
//                     <div
//                       className="text-gray-700 text-sm"
//                       dangerouslySetInnerHTML={{ __html: note.content }}
//                     />
//                   </div>
//                   <div className="flex gap-3 justify-center mt-3">
//                     <Link to="/edit" state={{ note }}>
//                       <button className="bg-blue-500 h-9 hover:bg-blue-600 text-white px-5 py-2 rounded-2 font-medium shadow transition">
//                         Edit
//                       </button>
//                     </Link>
//                     <button
//                       onClick={() => handleDelete(note.id)}
//                       className="bg-gray-950 h-9 hover:bg-gray-500 text-white px-5 py-2 rounded-2 font-medium shadow transition"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserDashboard;

import React, { useEffect, useState } from "react";
import {
  FaSearch,
} from "react-icons/fa";
import "../index.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const UserDashboard = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [editingNote, setEditingNote] = useState(null);
  const [show, setShow] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user?.token) return;

    const fetchNotes = async () => {
      try {
        const res = await fetch("http://localhost:5000/notes", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch notes");
        const data = await res.json();
        setNotes(data);
        setFilteredNotes(data);
      } catch (err) {
        console.error("Failed to load notes:", err);
      }
    };

    fetchNotes();
  }, [user.token]);

  useEffect(() => {
    const filtered = notes.filter((note) => {
      const query = searchQuery.toLowerCase();
      const titleMatch = note.title?.toLowerCase().includes(query);
      const contentMatch = note.content
        ?.replace(/<[^>]+>/g, "")
        .toLowerCase()
        .includes(query);
      return titleMatch || contentMatch;
    });
    setFilteredNotes(filtered);
  }, [searchQuery, notes]);

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.title || !newNote.content)
      return toast.error("Please fill all fields.");

    try {
      const res = await fetch("http://localhost:5000/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(newNote),
      });
      if (!res.ok) throw new Error("Failed to add note");
      const data = await res.json();
      toast("Note created successfully!",{style:{background:"#22c55e",color:"#fff"}});
      setNotes([data, ...notes]);
      setNewNote({ title: "", content: "" });
      handleClose();
    } catch (err) {
      console.error("Add note failed:", err);
    }
  };

  // 🔥 NEW — Delete Confirmation Modal Logic
  const confirmDelete = (note) => {
    setNoteToDelete(note);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmed = async () => {
    if (!noteToDelete) return;
    try {
      await fetch(`http://localhost:5000/notes/${noteToDelete.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setNotes(notes.filter((n) => n.id !== noteToDelete.id));
      toast("Note deleted successfully!",{style:{background:"#FF416C",color:"#fff"}});
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setShowDeleteModal(false);
      setNoteToDelete(null);
    }
  };

  const handleEdit = (note) => setEditingNote({ ...note });

  const handleSaveEdit = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          title: editingNote.title,
          content: editingNote.content,
        }),
      });

      if (!res.ok) throw new Error("Failed to update note");
      const updated = await res.json();
      setNotes(notes.map((n) => (n.id === id ? updated : n)));
      setEditingNote(null);
    } catch (err) {
      console.error("Edit failed:", err);
    }
  };

  const handleCancelEdit = () => setEditingNote(null);

  return (
    <div className="min-h-screen px-6 py-8">
      {/* ➕ Floating Add Button */}
      <button
        data-testid="open-add-modal"
        className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-2 shadow-lg hover:bg-blue-600 transition duration-300 flex items-center justify-center"
        title="Add a New Note"
        onClick={handleShow}
      >
        Add
      </button>

      {/* 🧾 Modal for Adding Note */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleAddNote}
            className="bg-white p-6 rounded-lg shadow-md mb-8"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              Add a New Note
            </h2>


              <input type="text" 
              value={newNote.title} 
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value})}
              placeholder="Add Note Title..."
              className="w-full p-2 border border-gray-300  mb-2"
              />


            {/* <ReactQuill
              theme="snow"
              value={newNote.title}
              onChange={(e) => setNewNote({ ...newNote, title: e })}
              className="bg-white mb-6"
              placeholder="Add Note Title..."
            /> */}

            <ReactQuill
              theme="snow"
              value={newNote.content}
              onChange={(e) => setNewNote({ ...newNote, content: e })}
              className="bg-white mb-6"
              placeholder="Create your note..."
            />

            <button
              data-testid="submit-add-note"
              type="submit"
              className="bg-blue-500 border-0 h-9 hover:bg-gray-500 hover:text-gray-950 text-white px-5 py-2 rounded-2 font-medium shadow transition"
              onClick={handleClose}
            >
              Add Note
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 🔥 Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete{" "}
          <strong
            dangerouslySetInnerHTML={{
              __html: noteToDelete?.title || "this note",
            }}
          ></strong>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirmed}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <br />
      <br />
      <br />

      {/* 🔍 Search Bar */}
      <center>
        <div className="flex justify-center items-center mb-6 bg-gray-100 rounded-lg p-2 shadow-sm h-13 w-full md:w-1/2">
          <FaSearch className="text-gray-500 mx-2 size-4" />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none text-gray-700 "
          />
        </div>
      </center>

      <br />
      <br />
      <br />

      {/* 🗂 Notes List */}
      {filteredNotes.length === 0 ? (
        <div className="flex flex-col items-center justify-center fixed inset-0 text-center">
    <div className="bg-white/70 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-3">
        Your Notes
      </h2>
      <p className="text-gray-500 italic">
        No notes found. Try a different search or add a new one!
      </p>
    </div>
  </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition border border-gray-100"
            >
              {editingNote && editingNote.id === note.id ? (
                <>
                  <ReactQuill
                    theme="snow"
                    value={editingNote.title}
                    onChange={(e) =>
                      setEditingNote({ ...editingNote, title: e })
                    }
                    className="bg-white mb-6"
                    placeholder="Edit your note title..."
                  />
                  <ReactQuill
                    theme="snow"
                    value={editingNote.content}
                    onChange={(e) =>
                      setEditingNote({ ...editingNote, content: e })
                    }
                    className="bg-white mb-6"
                    placeholder="Edit your note content..."
                  />
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => handleSaveEdit(note.id)}
                      className="bg-green-600 h-9 hover:bg-green-700 text-white px-5 py-2 rounded-2 font-medium shadow transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="bg-gray-950 h-9 hover:bg-gray-500 text-white px-5 py-2 rounded-2 font-medium shadow transition"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h3
                      dangerouslySetInnerHTML={{ __html: note.title }}
                      className="text-lg font-semibold text-gray-800 mb-1"
                    ></h3>
                    <div
                      className="text-gray-700 text-sm"
                      dangerouslySetInnerHTML={{ __html: note.content }}
                    />
                  </div>
                  <div className="flex gap-3 justify-center mt-3">
                    <Link to="/edit" state={{ note }}>
                      <button className="bg-blue-500 h-9 hover:bg-blue-600 text-white px-5 py-2 rounded-2 font-medium shadow transition">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => confirmDelete(note)} // ✅ now opens confirmation modal
                      className="bg-gray-950 h-9 hover:bg-gray-500 text-white px-5 py-2 rounded-2 font-medium shadow transition"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
