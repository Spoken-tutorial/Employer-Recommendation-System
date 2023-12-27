import { createBrowserRouter } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Layout from "../pages/Layout";
import Error from "../pages/Error";
import LoginPage from "../pages/Login";
import ViewAllEvents from "../components/eventsSection/viewAllEvents";
import ViewAllCompanies from "../components/companiesSection/viewallCompanies";
import ViewAllTestimonials from "../components/Testimonials/viewAllTestimonials";
import StudentProfile from "../components/student/student-profile/studentProfile";
import CompanyJobProfile from "../components/company/company-job-profile/companyJobProfile";

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
      { path: "/student-profile", element: <StudentProfile /> },
      { path: "/company-job-profile", element: <CompanyJobProfile /> },
    ],
  },
]);

export { router };
