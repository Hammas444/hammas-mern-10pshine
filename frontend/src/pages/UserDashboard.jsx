import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaSave, FaTimes, FaPlus } from "react-icons/fa";
import "../index.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [editingNote, setEditingNote] = useState(null);
 const [show, setShow] = useState(false);
 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

const user = JSON.parse(localStorage.getItem('user'));

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
      } catch (err) {
        console.error("Failed to load notes:", err);
      }
    };

    fetchNotes();
  }, [user.token]);

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.title || !newNote.content)
      return alert("Please fill all fields.");

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
      setNotes([data, ...notes]);
      setNewNote({ title: "", content: "" });
    } catch (err) {
      console.error("Add note failed:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/notes/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setNotes(notes.filter((note) => note.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
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
    <div className="min-h-screen  px-6 py-8">
  


  <button
      className="fixed bottom-6  right-6 bg-blue-500 text-white p-4 rounded-2 shadow-lg hover:bg-blue-600 transition duration-300 flex items-center justify-center"
      title="Add a New Note"
       onClick={handleShow}
    >
      Add
    </button>



 

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
        {/* <input
          type="text"
          placeholder="Title"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
          className="w-full p-3 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        /> */}

        <ReactQuill
          theme="snow"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e })}
          className="bg-white mb-6"
          placeholder="Add Note Title..."
        />



         <ReactQuill
          theme="snow"
          value={newNote.content}
          onChange={(e) => setNewNote({ ...newNote, content: e })}
          className="bg-white mb-6"
          placeholder="Create your note..."
        />

       
        <button
          type="submit"
          className="bg-blue-500 border-0 h-9  hover:bg-gray-500 hover:text-gray-950 text-white px-5 py-2 rounded-2 font-medium shadow transition"
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




      {/* Notes List */}
      <br /><br />

      {notes.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-screen text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Notes</h2>
        <p className="text-gray-500 text-center justify-center items-center italic">
          No notes found. Start by adding one above!
        </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition border border-gray-100"
            >
              {editingNote && editingNote.id === note.id ? (
                <>
                 

                   <ReactQuill
          theme="snow"
          value={editingNote.title}
          onChange={(e) => setEditingNote({ ...editingNote, title: e })}     
          className="bg-white mb-6"
          placeholder="Edit your note title..."
        />


          <ReactQuill
          theme="snow"
          value={editingNote.content}
          onChange={(e) => setEditingNote({ ...editingNote, content: e })} 
          className="bg-white mb-6"
          placeholder="Edit your note content..."
        />  


            


                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => handleSaveEdit(note.id)}
                      className="bg-green-600 border-0 h-9  hover:bg-green-700 hover:text-gray-950 text-white px-5 py-2 rounded-2 font-medium shadow transition"
                    >
                     Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="bg-gray-950 border-0 h-9  hover:bg-gray-500 hover:text-gray-950 text-white px-5 py-2 rounded-2 font-medium shadow transition"
                    >
                       Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h3 dangerouslySetInnerHTML={{ __html: note.title }} className="text-lg font-semibold text-gray-800 mb-1">
                    
                    </h3>
                      <div
                          className="text-gray-700 text-sm"
                          dangerouslySetInnerHTML={{ __html: note.content }}
                            /> </div>
                  <div className="flex gap-3 justify-center mt-3">
                   <Link to="/edit" state={{ note }}>
                      <button
                      className="bg-blue-500 border-0 h-9  hover:bg-blue-600 hover:text-gray-950 text-white px-5 py-2 rounded-2 font-medium shadow transition"
                       >
                      Edit
                    </button>                    </Link>
                    <button
                      onClick={() => handleDelete(note.id)}
                      className="bg-gray-950 border-0 h-9  hover:bg-gray-500 hover:text-gray-950 text-white px-5 py-2 rounded-2 font-medium shadow transition"
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
