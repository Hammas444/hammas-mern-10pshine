// // import React from 'react'
// // import { useState, useEffect } from "react";
// // import axios from "axios";

// // const Profile = () => {
 
// // const [formData, setFormData] = useState({ name: "", email: "", bio: "" });

// //  useEffect(() => {
// //     // fetch user details to prefill form
// //     const user = JSON.parse(localStorage.getItem("user"));
// //     axios.get(`http://localhost:5000/auth/getUsers`, {
// //       headers: { Authorization: `Bearer ${user?.token}` },
// //     }).then(res => setFormData(res.data.user));
// //   }, []);

// //   const handleChange = e => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// // async function handleSubmit(e){
// //   e.preventDefault();
// //   // Implement profile update logic here
// //   const res = await fetch(`http://localhost:5000/auth/updateUser/${user.user?.id}`,formData, {
// //     method: "PUT",
// //     headers: {
// //       "Content-Type": "application/json",
// //       Authorization: `Bearer ${user.user?.token}`,
// //     },
// //   });
// //   if (!res.ok) {
// //     return alert("Failed to update profile");
// //   }
// //   const data = await res.json();
// //   localStorage.setItem("user", JSON.stringify({...user, ...data}));
// //   alert("Profile updated successfully");
// //   window.location.href('/dashboard');
// // }







// //     return (
// //     <>
    
// //   <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
// //     <h2 className="text-2xl font-bold mb-6 text-gray-800">User Profile</h2>
// //     <div className="mb-4">
// //       <label className="block text-gray-700 font-semibold mb-2">Name:</label>
// //       <input type="text" className="w-full p-2 border rounded" value={formData.username}  onChange={handleChange}/>
// //     </div>
// //     <div className="mb-4">
// //       <label className="block text-gray-700 font-semibold mb-2">Email:</label>
// //       <input type="email" className="w-full p-2 border rounded" value={formData.email}  onChange={handleChange}/>
// //     </div>
// //     <div className="mb-4">
// //       <label className="block text-gray-700 font-semibold mb-2">User Password</label>
// //       <input type="password" className="w-full p-2 border rounded"  onChange={handleChange}/>
// //     </div>
// //     <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
// //       Update Profile
// //     </button>
// //   </form>
  
// // </>  
// //   )
// // }

// // export default Profile
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Profile = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });
//   const [user, setUser] = useState(null);

//   // ✅ Load stored user on mount
//   useEffect(() => {
//     const stored = localStorage.getItem("user");
//     if (stored) {
//       const parsedUser = JSON.parse(stored);
//       setUser(parsedUser);

//       // Prefill from localStorage data (or optionally fetch from backend)
//       setFormData({
//         username: parsedUser.user?.username || "",
//         email: parsedUser.user?.email || "",
//         password: "",
//       });
//     }
//   }, []);

//   // 🟡 Handle input change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // 🔵 Handle form submit
//   async function handleSubmit(e) {
//     e.preventDefault();
//     if (!user) return alert("User not logged in!");

//     try {
//       const res = await fetch(
//         `http://localhost:5000/auth/updateUser/${user.user?.id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${user.token}`,
//           },
//           body: JSON.stringify(formData),
//         }
//       );

//       if (!res.ok) return alert("Failed to update profile");

//       const updatedUser = await res.json();

//       // ✅ Update localStorage
//       localStorage.setItem(
//         "user",
//         JSON.stringify({
//           ...user,
//           user: {
//             ...user.user,
//             username: updatedUser.username,
//             email: updatedUser.email,
//           },
//         })
//       );

//       alert("Profile updated successfully!");
//       navigate("/dashboard");
//     } catch (error) {
//       console.error("Update error:", error);
//       alert("Error updating profile");
//     }
//   }

//   return (

// <>

// <br />
// <br />
// <br />

//     <form
//       onSubmit={handleSubmit}
//       className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md"
//     >
//       <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
//         User Profile
//       </h2>

//       <div className="mb-4">
//         <label className="block text-gray-700 font-semibold mb-2">
//           Username:
//         </label>
//         <input
//           type="text"
//           name="username"
//           className="w-full p-2 border rounded"
//           value={formData.username}
//           onChange={handleChange}
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block text-gray-700 font-semibold mb-2">Email:</label>
//         <input
//           type="email"
//           name="email"
//           className="w-full p-2 border rounded"
//           value={formData.email}
//           onChange={handleChange}
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block text-gray-700 font-semibold mb-2">
//           Password:
//         </label>
//         <input
//           type="password"
//           name="password"
//           className="w-full p-2 border rounded"
//           value={formData.password}
//           onChange={handleChange}
//           placeholder="Enter new password (optional)"
//         />
//       </div>

//       <button
//         type="submit"
//         className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
//       >
//         Update Profile
//       </button>
//     </form>
// </>

//   );
// };

// export default Profile;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Profile = () => {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // ✅ Load user from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const parsedUser = JSON.parse(stored);
      setUser(parsedUser);
      setFormData({
        username: parsedUser.user?.username || "",
        email: parsedUser.user?.email || "",
        password: "",
      });
    }
  }, []);

  // 🟡 Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔵 Handle update
  async function handleSubmit(e) {
    e.preventDefault();
    if (!user) return alert("User not logged in!");

    try {
      const res = await fetch(
        `http://localhost:5000/auth/updateUser/${user.user?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) return alert("Failed to update profile");

      const updatedUser = await res.json();

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          user: {
            ...user.user,
            username: updatedUser.username,
            email: updatedUser.email,
          },
        })
      );

      alert("Profile updated successfully!");
      setEditing(false);
      navigate("/dashboard");
    } catch (error) {
      console.error("Update error:", error);
      alert("Error updating profile");
    }
  }

  // 🔹 If no user
  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
        Loading user info...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      {/* User Info Card */}
      {!editing && (
        <div className="bg-white shadow-xl rounded-2xl p-8 max-w-sm w-full text-center transition-transform transform hover:scale-105 duration-300">
          <img
            src={`https://api.dicebear.com/9.x/initials/svg?seed=${user.user?.username}`}
            alt="avatar"
            className="w-24 h-24 mx-auto rounded-full mb-4 shadow-md border-2 border-blue-300"
          />
          <h2 className="text-2xl font-bold text-gray-800">
            {user.user?.username}
          </h2>
          <p className="text-gray-600 mb-2">{user.user?.email}</p>

        

          <button
            onClick={() => setEditing(true)}
            className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
          >
            Edit Your Profile
          </button>
        </div>
      )}

      {/* Edit Form */}
      {editing && (
        <form
          onSubmit={handleSubmit}
          className="max-w-md w-full mt-10 p-6 bg-white rounded-2xl shadow-md transition-all"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            Edit Profile
          </h2>

          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">
              Username
            </label>
            <input 
            id="username"
              type="text"
              name="username"
              className="w-full p-2 border rounded focus:outline-blue-400"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              className="w-full p-2 border rounded focus:outline-blue-400"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              className="w-full p-2 border rounded focus:outline-blue-400"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter new password (optional)"
            />
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              className="flex-1 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="flex-1 bg-gray-300 text-gray-700 p-2 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;
