import { createBrowserRouter } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Error from "../pages/Error";
import HeroParent from "../components/heroSection/heroParent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <HeroParent />,
      },
    ],
  },
]);

export { router };
