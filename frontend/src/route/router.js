import { createBrowserRouter } from "react-router-dom";

import Homepage, { loader as HomePageLoader } from "../pages/Homepage";
import ViewAllEvents, {
  loader as ViewAllEventsLoader,
} from "../components/eventsSection/viewAllEvents";
import ViewAllCompanies, {
  loader as ViewAllCompaniesLoader,
} from "../components/companiesSection/viewallCompanies";
import ViewAllTestimonials, {
  loader as ViewAllTestimonialsLoader,
} from "../components/Testimonials/viewAllTestimonials";
import ViewAllGallery from "../components/gallerySection/viewAllGallery";
import StudentProfile from "../components/student/student-profile/studentProfile";
import CompanyJobProfile from "../components/company/company-job-profile/companyJobProfile";
import FossFilter from "../components/admin/foss-filter/FossFilter";
import Layout from "../pages/Layout";
import Error from "../pages/Error";
import LoginPage from "../pages/Login";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Homepage />, loader: HomePageLoader },
      { path: "/login", element: <LoginPage /> },
      {
        path: "/events/view-all/:pageNum",
        element: <ViewAllEvents />,
        loader: ViewAllEventsLoader,
      },
      {
        path: "/companies/view-all/:pageNum",
        element: <ViewAllCompanies />,
        loader: ViewAllCompaniesLoader,
      },
      { path: "/gallery/view-all", element: <ViewAllGallery /> },
      {
        path: "/testimonials/view-all/:pageNum",
        element: <ViewAllTestimonials />,
        loader: ViewAllTestimonialsLoader,
      },
      { path: "/student-profile", element: <StudentProfile /> },
      { path: "/company-job-profile", element: <CompanyJobProfile /> },
      { path: "/foss-filter", element: <FossFilter /> },
    ],
  },
]);

export { router };
