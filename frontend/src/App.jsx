
import "./App.css";
import Navbar from "./components/Navbar";
import AuthForm from "./pages/AuthForm";
import React, { useState  } from "react";
import { Routes , Route, BrowserRouter } from "react-router-dom";
import Profile from "./pages/Profile";
import UserDashboard from "./pages/UserDashboard";
import EditNote from "./pages/EditNote";



function App() {


  return (
    <>



<BrowserRouter>

<Navbar />

<Routes>
  <Route path="/" element={<AuthForm />} />
  <Route path="/dashboard" element={<UserDashboard />} />
  <Route path="/edit" element={< EditNote/>} />
  <Route path="/profile" element={<Profile />} />
</Routes>

</BrowserRouter>


  </>
  );
}









export default App;
