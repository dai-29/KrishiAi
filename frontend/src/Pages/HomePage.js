import React from "react";
import Home from "./Home";
import Carousel from "../components/Carousel";
import Banner from "../components/Banner";
import About from "../components/About";
import Services from "../components/Services";

import Team from "../components/Team";
import Blog from "../components/Blog";
import Footer from "../components/Footer";
import BackToTop from "../components/BackToTop";

const HomePage = () => {
  return (
    <>
      <Home />
      <Carousel />
      <Banner />
      <About />
      <Services />
      <Team />
      <Blog />
      <Footer />
      <BackToTop />
    </>
  );
};

export default HomePage;
