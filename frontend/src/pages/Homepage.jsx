import Hero from "../views/heroSection/hero";
import About from "../views/aboutSection/about";
import UpcomingEvents from "../components/upcomingEvents/upcomingEvents";
import FeaturedEvents from "../components/eventsSection/featuredEvents";
import FeaturedCompanies from "../components/companiesSection/featuredCompanies";
import FeaturedGallery from "../components/gallerySection/featuredGallery";
import FeaturedTestimonials from "../components/Testimonials/featuredTestimonials";
import { getHomePage } from "../utils/api/homepage/homePage";
import { Await, defer, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import Spinner from "../components/common/Spinner";

const Homepage = () => {
  const { homePageData } = useLoaderData();

  return (
    <>
      <Hero></Hero>
      <Suspense fallback={<Spinner></Spinner>}>
        <Await resolve={homePageData}>
          {(data) => (
            <>
              <UpcomingEvents data={data.upcoming_events}></UpcomingEvents>
            </>
          )}
        </Await>
      </Suspense>
      <About></About>
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
    </>
  );
};

export default Homepage;

export function loader() {
  return defer({ homePageData: getHomePage() });
}
