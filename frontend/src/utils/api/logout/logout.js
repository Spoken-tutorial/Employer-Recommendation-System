/* eslint-disable no-undef */
export async function logoutUser(refreshToken) {
  const url = process.env.REACT_APP_API_LINK + "/api/logout/";

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refresh_token: refreshToken,
    }),
  };

  try {
    const response = await fetch(url, requestOptions);

    if (response.status === 205) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return { message: "Logout successful", status: response.status };
    } else if (response.status === 400) {
      return { message: "Logout failed", status: response.status };
    } else {
      return { message: "Unexpected Error", status: response.status };
    }
  } catch (error) {
    return { message: "Failed to log out", status: 500 };
  }
}
