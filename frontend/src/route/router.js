import { createBrowserRouter } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Error from "../pages/Error";
import Hero from "../views/heroSection/hero";
import About from "../views/aboutSection/about";
import Events from "../views/eventsSection/events";
import Companies from "../views/companiesSection/companies";
import Testimonials from "../views/testimonialsSection/testimonials";
import Login from "../views/login/login";
import FeaturedEvents from "../components/eventsSection/featuredEvents";
import ViewAllEvents from "../components/eventsSection/viewAllEvents";
import FeaturedCompanies from "../components/companiesSection/featuredCompanies";
import ViewallCompanies from "../components/companiesSection/viewallCompanies";

import CompanyRegistration, {
  action as compRegAction,
  loader as compRegLoader,
} from "../pages/CompanyRegistration";
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
        children: [
          { path: "", element: <FeaturedEvents /> },
          { path: "view-all", element: <ViewAllEvents /> },
        ],
      },
      {
        path: "/companies",
        element: <Companies />,
        children: [
          { path: "", element: <FeaturedCompanies /> },
          { path: "view-all", element: <ViewallCompanies /> },
        ],
      },
      {
        path: "/testimonials",
        element: <Testimonials />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "company/registration",
    element: <CompanyRegistration />,
    errorElement: <Error />,
    action: compRegAction,
    loader: compRegLoader,
  },
]);

export { router };
