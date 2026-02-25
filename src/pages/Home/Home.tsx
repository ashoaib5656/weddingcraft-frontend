import { type JSX } from "react";
import { Box } from "@mui/material";
import WhyChooseUs from "../../components/WhyChooseUs/WhyChooseUs";
import Services from "../Services/Services";
import ContactUs from "../ContactUs/ContactUs";
import AboutUs from "../AboutUs/AboutUs";
import Reviews from "../Reviews/Reviews";
import Hero from "../../components/Hero/Hero";

const Home = (): JSX.Element => {
  const sectionSx = {
    scrollMarginTop: "80px",
  };

  return (
    <Box className="home-page">
      <Hero />
      <Box component="section" id="why-choose-us" sx={sectionSx}>
        <WhyChooseUs />
      </Box>
      <Box component="section" id="services" sx={sectionSx}>
        <Services />
      </Box>
      <Box component="section" id="contact" sx={sectionSx}>
        <ContactUs />
      </Box>
      <Box component="section" id="about" sx={sectionSx}>
        <AboutUs />
      </Box>
      <Box component="section" id="reviews" sx={sectionSx}>
        <Reviews />
      </Box>
    </Box>
  );
};

export default Home;
