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
import LoginForm, {
  action as LoginAction,
} from "../components/login/loginForm";
import ViewAllGallery from "../components/gallerySection/viewAllGallery";
import StudentProfile from "../components/student/student-profile/studentProfile";
import CompanyJobProfile from "../components/company/company-job-profile/companyJobProfile";
import FossFilter from "../components/admin/foss-filter/FossFilter";
import Layout from "../pages/Layout";
import Error from "../pages/Error";
import ProtectedRoute from "../components/common/protectedRoute";
import StudentLayout, { action as LogoutAction } from "../pages/StudentLayout";
import ManagerLayout from "../pages/ManagerLayout";
import EmployerLayout from "../pages/EmployerLayout";
import UnderDevelopmentInfo from "../components/common/underDevelopment";

const router = createBrowserRouter([
  {
    //common without auth routes
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Homepage />, loader: HomePageLoader },
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

      { path: "/foss-filter", element: <FossFilter /> },
      {
        path: "/login",
        element: (
          <ProtectedRoute accessBy={"unauth"}>
            <LoginForm />
          </ProtectedRoute>
        ),
        action: LoginAction,
      },
    ],
  },
  {
    //student related auth routes
    path: "/auth/STUDENT",
    element: (
      <ProtectedRoute accessBy={"auth"}>
        <StudentLayout />
      </ProtectedRoute>
    ),
    action: LogoutAction,
    children: [
      { path: "", element: <UnderDevelopmentInfo /> },
      { path: "profile", element: <StudentProfile /> },
      { path: "jobs", element: <UnderDevelopmentInfo /> },
    ],
  },
  {
    //manager related auth routes
    path: "/auth/MANAGER",
    element: (
      <ProtectedRoute accessBy={"auth"}>
        <ManagerLayout />
      </ProtectedRoute>
    ),
    children: [{ path: "", element: <UnderDevelopmentInfo /> }],
  },
  {
    //employer related auth routes
    path: "/auth/EMPLOYER",
    element: (
      <ProtectedRoute accessBy={"auth"}>
        <EmployerLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <UnderDevelopmentInfo /> },
      { path: "jobs", element: <CompanyJobProfile /> },
      { path: "profile", element: <UnderDevelopmentInfo /> },
    ],
  },
]);

export { router };
