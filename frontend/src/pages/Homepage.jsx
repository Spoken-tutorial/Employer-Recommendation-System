import Navbar from "../views/navbar/navbar";
import Hero from "../views/heroSection/hero";
import About from "../views/aboutSection/about";
import FeaturedEvents from "../components/eventsSection/featuredEvents";
import FeaturedCompanies from "../components/companiesSection/featuredCompanies";
import FeaturedGallery from "../components/gallerySection/featuredGallery";
import FeaturedTestimonials from "../components/Testimonials/featuredTestimonials";

const Homepage = () => {
  return (
    <>
      <Navbar></Navbar>
      <Hero></Hero>
      <About></About>
      <FeaturedEvents></FeaturedEvents>
      <FeaturedCompanies></FeaturedCompanies>
      <FeaturedGallery></FeaturedGallery>
      <FeaturedTestimonials></FeaturedTestimonials>
    </>
  );
};

export default Homepage;
