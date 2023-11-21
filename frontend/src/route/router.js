import { createBrowserRouter } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Error from "../pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
    errorElement: <Error />,
  },
]);

export { router };
