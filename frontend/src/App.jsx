import "./app.scss";
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
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import Pay from "./pages/pay/Pay";
import Success from "./pages/success/Success";

const queryClient = new QueryClient();

function App() {
  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <Layout />,
  //     children: [
  //       {
  //         path: "/",
  //         element: <Home />,
  //       },
  //       {
  //         path: "/gigs",
  //         element: <Gigs />,
  //       },
  //       {
  //         path: "/myGigs",
  //         element: <MyGigs />,
  //       },
  //       {
  //         path: "/orders",
  //         element: <Orders />,
  //       },
  //       {
  //         path: "/messages",
  //         element: <Messages />,
  //       },
  //       {
  //         path: "/message/:id",
  //         element: <Message />,
  //       },
  //       {
  //         path: "/add",
  //         element: <Add />,
  //       },
  //       {
  //         path: "/gig/:id",
  //         element: <Gig />,
  //       },
  //     ],
  //   },
  //   {
  //     path: "/register",
  //     element: <Register />,
  //   },
  //   {
  //     path: "/login",
  //     element: <Login />,
  //   },
  //   {
  //     path: "/pay/:id",
  //     element: <Pay />,
  //   },
  //   {
  //     path: "/success",
  //     element: <Success />,
  //   },
  // ]);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gigs" element={<Gigs />} />
        <Route path="/myGigs" element={<MyGigs />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/message/:id" element={<Message />} />
        <Route path="/add" element={<Add />} />
        <Route path="/gig/:id" element={<Gig />} />
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
