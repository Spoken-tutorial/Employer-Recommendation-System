import Navbar from "../views/navbar/navbar";
import Hero from "../views/heroSection/hero";
import About from "../views/aboutSection/about";
import FeaturedEvents from "../components/eventsSection/featuredEvents";
import FeaturedCompanies from "../components/companiesSection/featuredCompanies";
import FeaturedTestimonials from "../components/Testimonials/featuredTestimonials";

const Homepage = () => {
  return (
    <>
      <Navbar></Navbar>
      <Hero></Hero>
      <About></About>
      <FeaturedEvents></FeaturedEvents>
      <FeaturedCompanies></FeaturedCompanies>
      <FeaturedTestimonials></FeaturedTestimonials>
    </>
  );
};

export default Homepage;
