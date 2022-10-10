import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import axios from "axios";

//Components
import Home from "./Components/Home";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Contact from "./Components/Contact";
import About from "./Components/About";
import SinglePost from "./Components/SinglePost";
import CreatePost from "./Components/CreatePost";

//Styles
import "./css/styles.css";


axios.defaults.baseURL =  process.env.BASEURL || "http://backend.test/wp-json/wp/v2/"

function Index () {

  return (
    <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/post/:id" element={<SinglePost />} />
        <Route path="/create" element={<CreatePost />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Index />
);
