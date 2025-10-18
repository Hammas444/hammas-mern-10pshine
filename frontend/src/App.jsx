
import "./App.css";
import Navbar from "./components/Navbar";
import AuthForm from "./pages/AuthForm";
import React, { useState  } from "react";
import { Routes , Route, BrowserRouter } from "react-router-dom";
import Profile from "./pages/Profile";
import UserDashboard from "./pages/UserDashboard";
import EditNote from "./pages/EditNote";



function App() {


const user = JSON.parse(localStorage.getItem("user"));


  return (
    <>



<BrowserRouter>

 {user && <Navbar />}

<Routes>

{!user && <Route path="/" element={<AuthForm />} />}

{user? (
<>

  <Route path="/dashboard" element={<UserDashboard />} />
  <Route path="/edit" element={< EditNote/>} />
  <Route path="/profile" element={<Profile />} />


</>

) : (
  <Route path="*" element={<AuthForm />} />
)}

</Routes>

</BrowserRouter>


  </>
  );
}









export default App;
