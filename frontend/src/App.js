import './App.css';
import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom';
import Homepage, { loader as homePageLoader } from './pages/Homepage';
import ApproveCompany, { loader as approveCompanyLoader} from './pages/ApproveCompany';
import Login, { action as loginAction } from './pages/Login';
import Error from './pages/Error';
import { requireAuth } from './utils';
import { loader as loginLoader } from './pages/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
    errorElement: <Error/>,
    loader: homePageLoader,
  },
  {
    path: 'register/company',
    element: <Homepage />,
    loader: homePageLoader,
  },
  {
    path: 'login',
    element: <Login />,
    loader: loginLoader,
    action: loginAction,
  },
  {
    path: 'approve/companies',
    element: <ApproveCompany />,
    loader: approveCompanyLoader,
  },
  {
    path: 'approve/jobs',
    element: <Homepage />,
    loader: homePageLoader,
  },

]);

function App() {
  return ( 
    <>
    <RouterProvider router={router}/>
    {/* <p>this</p> */}
    </>
  );
}

export default App;
