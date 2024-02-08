/* eslint-disable no-undef */
export async function loginUser(username, password) {
  const url = process.env.REACT_APP_API_LINK + "/api/token/";

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  };

  try {
    //wait for response
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      // Handle unauthorize user not found responses status 401
      const errorData = await response.json();
      return { error: errorData.detail, status: response.status };
    }
    //success
    const tokens = await response.json();
    //status user found  200
    return {
      refresh: tokens.refresh,
      access: tokens.access,
      status: response.status,
    };
  } catch (error) {
    // Handle network errors or other exceptions
    return { message: "Failed to log in", status: 500 };
  }
}
