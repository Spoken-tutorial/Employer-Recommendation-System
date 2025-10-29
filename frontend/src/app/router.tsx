import { createBrowserRouter } from 'react-router-dom'
// import App from './App'
// Layouts
import AppLayout from 'src/layouts/AppLayout';
import StudentLayout from 'src/layouts/StudentLayout';
import EmployerLayout from 'src/layouts/EmployerLayout';
import AdminLayout from 'src/layouts/AdminLayout';

// Public Pages
import HomePage from '@features/home/HomePage'
import AboutPage from '@features/public/AboutPage';
import CompanyRegistrationPage from '@features/company/pages/CompanyRegistrationPage';
import LoginPage from '@features/public/LoginPage';

// Student
import StudentDashboard from '@features/student/StudentDashboard';
import StudentJobs from '@features/student/StudentJobs';
import StudentProfile from '@features/student/StudentProfile';

// Employer
import EmployerDashboard from '@features/employer/EmployerDashboard';
import EmployerJobs from '@features/employer/EmployerJobs';
import EmployerApplicants from '@features/employer/EmployerApplicants';

// Admin
import AdminDashboard from '@features/admin/AdminDashboard';
import AdminCompanies from '@features/admin/AdminCompanies';
import AdminJobs from '@features/admin/AdminJobs';
import AdminStudents from '@features/admin/AdminStudents';
import AdminEmails from '@features/admin/AdminEmails';
import AdminCompanyAddPage from '@features/company/pages/AdminCompanyAddPage';


export const router = createBrowserRouter([
  // Public/Common (AppLayout with responsive top nav)
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage />},
      { path: "login", element: <LoginPage />},
      { path: "register/company", element: <CompanyRegistrationPage />},
    ],
  },

  // Student (top nav)
  {
    path: "/student",
    element: <StudentLayout />,
    children: [
      { index: true, element: <StudentDashboard />},
      { path: "jobs", element: <StudentJobs />},
      { path: "profile", element: <StudentProfile />},
    ]
  },

  // Employer (top nav)
  {
    path: "/employer",
    element: <EmployerLayout />,
    children: [
      { index: true, element: <EmployerDashboard />},
      { path: "jobs", element: <EmployerJobs />},
      { path: "applicants", element: <EmployerApplicants />},
    ],
  },

  // Admin (side nav)
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "companies", element: <AdminCompanies /> },
      { path: "companies/add", element: <AdminCompanyAddPage /> },
      { path: "jobs", element: <AdminJobs /> },
      { path: "students", element: <AdminStudents /> },
      { path: "emails", element: <AdminEmails /> },
    ],
  },
]);
