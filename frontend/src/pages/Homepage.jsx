import Navbar from "../views/navbar/navbar";
import Hero from "../views/heroSection/hero";
import About from "../views/aboutSection/about";
import UpcomingEvents from "../components/upcomingEvents/upcomingEvents";
import FeaturedEvents from "../components/eventsSection/featuredEvents";
import FeaturedCompanies from "../components/companiesSection/featuredCompanies";
import FeaturedGallery from "../components/gallerySection/featuredGallery";
import FeaturedTestimonials from "../components/Testimonials/featuredTestimonials";
import { getHomePage } from "../utils/api/home";
import { useLoaderData } from "react-router-dom";

const Homepage = () => {
  const homepageDate = useLoaderData();
  return (
    <>
      <Navbar></Navbar>
      <Hero></Hero>
      <UpcomingEvents data={homepageDate.upcoming_events}></UpcomingEvents>
      <About></About>
      <FeaturedEvents data={homepageDate.past_events}></FeaturedEvents>
      <FeaturedCompanies data={homepageDate.companies}></FeaturedCompanies>
      <FeaturedGallery data={homepageDate.gallery_images}></FeaturedGallery>
      <FeaturedTestimonials
        data={homepageDate.testimonials}
      ></FeaturedTestimonials>
    </>
  );
};

export default Homepage;

export function loader() {
  return getHomePage();
}
