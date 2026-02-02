import React from "react";

import Topbar from "./components/Topbar";
 import Navbar from "./components/Navbar";
import Carousel from "./components/Carousel";
import Banner from "./components/Banner";
import About from "./components/About";
 import Services from "./components/Services";
import Products from "./components/Products";
import Team from "./components/Team";
import Blog from "./components/Blog";
import Footer from "./components/Footer";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';

function App() {
  return (
    <>
      {/* <Header /> */}
      <Topbar />
      <Navbar />
      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
      </Routes> */}
      <Carousel />
      <Banner />
      <About />
      <Services />
      <Products />
      <Team />
      <Blog />
      <Footer />
    </>
  );
}

export default App;
