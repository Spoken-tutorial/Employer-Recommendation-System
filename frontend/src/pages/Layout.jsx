import FooterMain from "../components/footer/footerMain";
import Container from "@mui/material/Container";
import { Outlet } from "react-router-dom";
import { navItemsHomepage } from "../constants/navbar.jsx";
import NavbarMain from "../components/Navigation";

const Layout = () => {
  return (
    <>
      <NavbarMain navItems={navItemsHomepage} homepage={true}></NavbarMain>
      <Container maxWidth="xl" sx={{ marginTop: "8rem", mb: "4rem" }}>
        <Outlet></Outlet>
      </Container>
      <FooterMain></FooterMain>
    </>
  );
};

export default Layout;