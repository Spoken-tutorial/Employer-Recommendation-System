import Navbar from "../views/navbar/navbar";
import Footer from "../views/footer/footer";
import Container from "@mui/material/Container";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar></Navbar>
      <Container sx={{ marginTop: "8rem", mb: "4rem" }}>
        <Outlet></Outlet>
      </Container>
      <Footer></Footer>
    </>
  );
};

export default Layout;
