import React from "react";
import NavbarMain from "../components/navbar/navbarMain";
import { navItemsEmployer } from "../constants/navbar";
import Footer from "../views/footer/footer";
import Container from "@mui/material/Container";
import { Outlet } from "react-router-dom";

function EmployerLayout() {
  return (
    <>
      <NavbarMain navItems={navItemsEmployer} homepage={false}></NavbarMain>
      <Container sx={{ marginTop: "8rem", mb: "4rem" }}>
        <Outlet></Outlet>
      </Container>
      <Footer></Footer>
    </>
  );
}
export default EmployerLayout;
