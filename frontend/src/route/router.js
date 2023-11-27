import { createBrowserRouter } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Error from "../pages/Error";
import Hero from "../views/heroSection/hero";
import About from "../views/aboutSection/about";
import Events from "../views/eventsSection/events";
import Companies from "../views/companiesSection/companies";
import TestimonialsSection from "../components/Testimonials/testimonials";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Hero />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/events",
        element: <Events />,
      },
      {
        path: "/companies",
        element: <Companies />,
      },
      {
        path: "/testimonials",
        element: <TestimonialsSection />,
      },
    ],
  },
]);

export { router };
