import HeroSection from "../components/heroSection/heroSection";
import AboutSection from "../components/aboutSection/about";
import UpcomingEvents from "../components/upcomingEvents/upcomingEvents";
import FeaturedEvents from "../components/eventsSection/featuredEvents";
import FeaturedCompanies from "../components/companiesSection/featuredCompanies";
import FeaturedGallery from "../components/gallerySection/featuredGallery";
import FeaturedTestimonials from "../components/Testimonials/featuredTestimonials";
import ContactUs from "../components/contactSection/ContactUs";
import { getHomePage } from "../utils/api/homepage/homePage";
import { Await, defer, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import Spinner from "../components/common/Spinner";

const Homepage = () => {
  const { homePageData } = useLoaderData();

  return (
    <>
      <HeroSection></HeroSection>
      <Suspense fallback={<Spinner></Spinner>}>
        <Await resolve={homePageData}>
          {(data) => (
            <>
              <UpcomingEvents data={data.upcoming_events}></UpcomingEvents>
            </>
          )}
        </Await>
      </Suspense>
      <AboutSection></AboutSection>
      <Suspense fallback={<Spinner></Spinner>}>
        <Await resolve={homePageData}>
          {(data) => (
            <>
              <FeaturedEvents data={data.past_events}></FeaturedEvents>
              <FeaturedCompanies data={data.companies}></FeaturedCompanies>
              <FeaturedGallery data={data.gallery_images}></FeaturedGallery>
              <FeaturedTestimonials
                data={data.testimonials}
              ></FeaturedTestimonials>
            </>
          )}
        </Await>
      </Suspense>
      <ContactUs></ContactUs>
    </>
  );
};

export default Homepage;

export function loader() {
  return defer({ homePageData: getHomePage() });
}
