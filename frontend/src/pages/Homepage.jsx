import { Outlet } from "react-router-dom";
import NavbarParent from "../components/navbar/navbarParent";
import FooterParent from "../components/footer/footerParent";

const Homepage = () => {
  return (
    <>
      <NavbarParent></NavbarParent>
      <Outlet></Outlet>
      <FooterParent></FooterParent>
    </>
  );
};

export default Homepage;
