
// import "./App.css";
// import Navbar from "./components/Navbar";
// import AuthForm from "./pages/AuthForm";
// import React, { useState  } from "react";
// import { Routes , Route, BrowserRouter } from "react-router-dom";
// import Profile from "./pages/Profile";
// import UserDashboard from "./pages/UserDashboard";
// import EditNote from "./pages/EditNote";



// function App() {


// const user = JSON.parse(localStorage.getItem("user"));
// console.log(user)

//   return (
//     <>



// <BrowserRouter>

//  {user && <Navbar />}
  
// <Routes>

// {!user && <Route path="/" element={<AuthForm />} />}

// {user? (
// <>
   
// { user &&  <Route path="/dashboard" element={<UserDashboard />} /> }
//  <Route path="/edit" element={< EditNote/>} />
// <Route path="/profile" element={<Profile />} />


// </>

// ) : (
//   <Route path="*" element={<AuthForm />} />
// )}

// </Routes>

// </BrowserRouter>


//   </>
//   );
// }

// export default App;




import "./App.css";
import Navbar from "./components/Navbar";
import AuthForm from "./pages/AuthForm";
import React from "react";
import {Routes,Route,BrowserRouter,Navigate,} from "react-router-dom";
import Profile from "./pages/Profile";
import UserDashboard from "./pages/UserDashboard";
import EditNote from "./pages/EditNote";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("User:", user);

  return (
    <BrowserRouter>
      {user && <Navbar />}

      <Routes>
        {/* If user is not logged in */}
        {!user && (
          <>
            <Route path="/" element={<AuthForm />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}

        {/* If user is logged in */}
        {user && (
          <>
            {/* Default route → dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/edit" element={<EditNote />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
