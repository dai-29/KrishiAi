import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Topbar from "./components/Topbar";
import Navbar from "./components/Navbar";

import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Contact from "./Pages/contact";
// import Welcome from "./Pages/Welcome";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Topbar />
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        {/* <Route path="/welcome" element={<Welcome />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;



// import React from "react";

// import Topbar from "./components/Topbar";
//  import Navbar from "./components/Navbar";
// import Login from "./Pages/Login";
// import Register from "./Pages/Register";
// import Home from "./Pages/Home";
// import Contact from "./Pages/contact";
// import Welcome from "./Pages/Welcome";

// import Carousel from "./components/Carousel";
// import Banner from "./components/Banner";
// import About from "./components/About";
//  import Services from "./components/Services";
// import Products from "./components/Products";
// import Team from "./components/Team";
// import Blog from "./components/Blog";
// import Footer from "./components/Footer";
// import { BrowserRouter, Routes, Route } from "react-router-dom";


// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import './App.css';

// function App() {
//   return (
//     <>
//       {/* <Header /> */}
//       <Topbar />
//       <Navbar />
//       <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/welcome" element={<Welcome />} />

//       </Routes>
//       </BrowserRouter>
//       <Carousel />
//       <Banner />
//       <About />
//       <Services />
//       <Products />
//       <Team />
//       <Blog />
//       <Footer />
//     </>
//   );
// }

// export default App;



// import React from "react";

// import Topbar from "./components/Topbar";
// import Navbar from "./components/Navbar";
// import Login from "./Pages/Login";
// import Register from "./Pages/Register";
// import Home from "./Pages/Home";
// import Contact from "./Pages/contact";
// import Welcome from "./Pages/Welcome";

// import Carousel from "./components/Carousel";
// import Banner from "./components/Banner";
// import About from "./components/About";
// import Services from "./components/Services";
// import Products from "./components/Products";
// import Team from "./components/Team";
// import Blog from "./components/Blog";
// import Footer from "./components/Footer";

// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import "./App.css";

// function App() {
//   return (
//     <BrowserRouter>
//       <Topbar />
//       <Navbar />

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/welcome" element={<Welcome />} />
//       </Routes>

//       <Carousel />
//       <Banner />
//       <About />
//       <Services />
//       <Products />
//       <Team />
//       <Blog />
//       <Footer />
//     </BrowserRouter>
//   );
// }

// export default App;



// src/App.js