import { createBrowserRouter } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Error from "../pages/Error";
import HeroParent from "../components/heroSection/heroParent";
import AboutSection from "../components/aboutSection/about";
import EventSection from "../components/eventsSection/events";
import CompaniesSection from "../components/companiesSection/companies";
import TestimonialsSection from "../components/Testimonials/testimonials";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <HeroParent />,
      },
      {
        path: "/about",
        element: <AboutSection />,
      },
      {
        path: "/events",
        element: <EventSection />,
      },
      {
        path: "/companies",
        element: <CompaniesSection />,
      },
      {
        path: "/testimonials",
        element: <TestimonialsSection />,
      },
    ],
  },
]);

export { router };
