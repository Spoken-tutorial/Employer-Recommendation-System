import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { useActionData, useNavigate, useNavigation } from "react-router-dom";
import { logoutUser } from "../utils/api/logout/logout";
import Spinner from "../components/common/Spinner";
import LeftNavbar from "../components/admin/leftNavbar/LeftNavbar";

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
      {navigation.state === "submitting" ? (
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            justifyItems: "center",
            alignContent: "center",
          }}
        >
          <Spinner />
        </Box>
      ) : (
        <>
          <LeftNavbar></LeftNavbar>
        </>
      )}
    </>
  );
}
export default ManagerLayout;
export async function action() {
  const refreshToken = localStorage.getItem("refresh");
  const logoutResponse = await logoutUser(refreshToken);
  return logoutResponse;
}
