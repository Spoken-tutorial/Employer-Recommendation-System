import { Outlet } from "react-router-dom";
import Navbar from "../views/navbar/navbar";
import Footer from "../views/footer/footer";

const Homepage = () => {
  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
};

export default Homepage;
