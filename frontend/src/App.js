import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import React from "react";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Gigs from "./pages/gigs/Gigs";
import Gig from "./pages/gig/Gig";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Add from "./pages/add/Add";
import Orders from "./pages/orders/Orders";
import Messages from "./pages/messages/Messages";
import Message from "./pages/message/Message";
import MyGigs from "./pages/myGigs/MyGigs";

import Pay from "./pages/pay/Pay";
import Success from "./pages/success/Success";
import ReqAuth from "./Hoc/ReqAuth";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gigs" element={<Gigs />} />
        <Route path="/myGigs" element={<MyGigs />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/message/:id" element={<Message />} />
        <Route path="/add" element={<Add />} />
        <Route
          path="/gig/:id"
          element={
            <ReqAuth>
              <Gig />
            </ReqAuth>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pay/:id" element={<Pay />} />
        <Route path="/success" element={<Success />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
