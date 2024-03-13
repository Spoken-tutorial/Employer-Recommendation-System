import React, { useEffect } from "react";
import NavbarMain from "../components/navbar/navbarMain";
import Box from "@mui/material/Box";
import { navItemsStudent } from "../constants/navbar";
import FooterMain from "../components/footer/footerMain";
import Container from "@mui/material/Container";
import {
  Outlet,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { logoutUser } from "../utils/api/logout/logout";
import Spinner from "../components/common/Spinner";

function StudentLayout() {
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
      <NavbarMain navItems={navItemsStudent} homepage={false}></NavbarMain>
      <Container sx={{ marginTop: "8rem", mb: "4rem" }}>
        {navigation.state === "submitting" ? (
          <Box
            sx={{
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Spinner />
          </Box>
        ) : (
          <Outlet></Outlet>
        )}
      </Container>
      <FooterMain></FooterMain>
    </>
  );
}
export default StudentLayout;

//logout
export async function action() {
  const refreshToken = localStorage.getItem("refresh");
  const logoutResponse = await logoutUser(refreshToken);
  return logoutResponse;
}
