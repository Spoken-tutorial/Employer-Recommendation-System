import React, { useEffect } from "react";
import NavbarMain from "../components/navbar/navbarMain";
import { navItemsManager } from "../constants/navbar";
import Footer from "../views/footer/footer";
import Container from "@mui/material/Container";
import {
  Outlet,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { logoutUser } from "../utils/api/logout/logout";
import Spinner from "../components/common/Spinner";

function ManagerLayout() {
  const navigate = useNavigate();
  const actionData = useActionData();
  const navigation = useNavigation();
  useEffect(() => {
    if (actionData == undefined) {
      return;
    } else {
      if (actionData.status == 205) {
        navigate("/");
      } else {
        alert(actionData.message);
      }
    }
  }, [actionData]);

  return (
    <>
      <NavbarMain navItems={navItemsManager} homepage={false}></NavbarMain>
      <Container sx={{ marginTop: "8rem", mb: "4rem" }}>
        {navigation.state === "submitting" ? <Spinner /> : <Outlet></Outlet>}
      </Container>
      <Footer></Footer>
    </>
  );
}
export default ManagerLayout;
export async function action() {
  const refreshToken = localStorage.getItem("refresh");
  const logoutResponse = await logoutUser(refreshToken);
  return logoutResponse;
}
