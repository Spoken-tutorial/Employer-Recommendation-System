import React from "react";
import NavbarMain from "../components/navbar/navbarMain";
import { navItemsManager } from "../constants/navbar";
import Footer from "../views/footer/footer";
import Container from "@mui/material/Container";
import { Outlet } from "react-router-dom";

function ManagerLayout() {
  return (
    <>
      <NavbarMain navItems={navItemsManager} homepage={false}></NavbarMain>
      <Container sx={{ marginTop: "8rem", mb: "4rem" }}>
        <Outlet></Outlet>
      </Container>
      <Footer></Footer>
    </>
  );
}
export default ManagerLayout;
