// src/router.jsx
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

// Layouts
import StudentLayout from './layouts/StudentLayout.jsx';
import EmployerLayout from './layouts/EmployerLayout.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';
import ManagerLayout from './layouts/ManagerLayout.jsx';

// Pages
import StudentDashboard from './pages/student/Dashboard.jsx';
import EmployerDashboard from './pages/employer/Dashboard.jsx';
import AdminDashboard from './pages/admin/Dashboard.jsx';
import Login from './pages/auth/Login.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import CompanyRegistration from './pages/auth/CompanyRegistration.jsx';
import RegistrationSuccess from './pages/RegistrationSuccess.jsx';
import Job from './pages/employer/Jobs.jsx';
import CreateJob from './pages/employer/CreateJob.jsx';
import EditJob from './pages/employer/EditJob.jsx';
import JobDetail from './pages/employer/JobDetail.jsx';
import StudentDisplayProfile from './pages/student/StudentDisplayProfile.jsx';
import StudentProfileForm from './pages/student/StudentProfileForm.jsx';
import StudentJobsList from './pages/student/StudentJobsList.jsx';
import Team from './pages/employer/Team.jsx';
import Jobs from './pages/admin/Jobs.jsx';
import Companies from './pages/admin/Companies.jsx';
import Students from './pages/admin/Students.jsx';
import Mail from './pages/admin/Mail.jsx';
import CompanyDetail from './pages/admin/CompanyDetail.jsx';
import StudentFilter from './pages/employer/StudentFilter.jsx';
import ManagerHome from './pages/manager/Home.jsx';
import ManagerJobs from './pages/manager/Jobs.jsx';
import ManagerCreateJob from './pages/manager/CreateJob.jsx';
import ManagerEditJob from './pages/manager/EditJob.jsx';
import ManagerJobDetail from './pages/manager/JobDetail.jsx';
import ManagerCompanies from './pages/manager/Companies.jsx';
import ManagerAddCompany from './pages/manager/AddCompany.jsx';
import ManagerCompanyDetail from './pages/manager/CompanyDetail.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <CompanyRegistration />, // Default entry
  },
  {
    path: '/login',
    element: <Login />, // Default entry
  },
  {
    path: '/register',
    element: <CompanyRegistration />,
  },
   {
    path: '/success',
    element: <RegistrationSuccess />,
  },
  {
    path: '/student',
    element: <StudentLayout />,
    children: [
      { path: '', element: <StudentDashboard /> },
      { path: 'dashboard', element: <StudentDashboard /> },
      { path: 'jobs', element: <StudentJobsList /> },
      { path: 'profile/:spk_usr_id', element: <StudentProfileForm /> },
      // Add more student routes here
    ],
  },
  {
    path: '/employer',
    element: <EmployerLayout />,
    children: [
      { path: '', element: <EmployerDashboard /> },
      { path: 'dashboard', element: <EmployerDashboard /> },
      { path: 'registration', element: <CompanyRegistration /> },
      { path: 'jobs', element: <Job /> },
      { path: 'jobs/add', element: <CreateJob /> },
      { path: 'jobs/edit/:job_id', element: <EditJob /> },
      { path: 'jobs/:job_id', element: <JobDetail /> },
      { path: 'student/profile/:student_id', element: <StudentDisplayProfile /> },
      { path: 'team/', element: <Team /> },
      { path: 'filter/', element: <StudentFilter /> },

      
      // Add more employer routes here
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { path: '', element: <AdminDashboard /> },
      { path: 'dashboard', element: <AdminDashboard /> },
      { path: 'jobs', element: <Jobs /> },
      { path: 'jobs/job_id', element: <JobDetail /> },
      { path: 'companies', element: <Companies /> },
      { path: 'companies/:company_id', element: <CompanyDetail /> },
      { path: 'students', element: <Students /> },
      { path: 'mail', element: <Mail /> },
      // Add more admin routes here
    ],
  },
  {
    path: '/manager',
    element: <ManagerLayout />,
    children: [
      { path: '', element: <ManagerHome /> },
      { path: 'jobs', element: <ManagerJobs /> },
      { path: 'jobs/add', element: <ManagerCreateJob /> },
      { path: 'jobs/edit/:job_id', element: <ManagerEditJob /> },
      { path: 'jobs/:job_id', element: <ManagerJobDetail /> },
      { path: 'companies', element: <ManagerCompanies /> },
      { path: 'company/add', element: <ManagerAddCompany /> },
      { path: 'company/:company_id', element: <ManagerCompanyDetail /> },
    ]
  },
  {
    path: '*', // Catch-all route for undefined paths
    element: <ErrorPage />, 
  }
]);

export default router;
