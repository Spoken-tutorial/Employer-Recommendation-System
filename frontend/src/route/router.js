import { createBrowserRouter } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Layout from "../pages/Layout";
import Error from "../pages/Error";
import LoginPage from "../pages/Login";
import ViewAllEvents from "../components/eventsSection/viewAllEvents";
import ViewAllCompanies from "../components/companiesSection/viewallCompanies";
import ViewAllTestimonials from "../components/Testimonials/viewAllTestimonials";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Homepage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/events/view-all", element: <ViewAllEvents /> },
      { path: "/companies/view-all", element: <ViewAllCompanies /> },
      { path: "/testimonials/view-all", element: <ViewAllTestimonials /> },
    ],
  },
]);

export { router };
