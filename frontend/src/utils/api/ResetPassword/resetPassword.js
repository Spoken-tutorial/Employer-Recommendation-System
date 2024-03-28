/* eslint-disable no-undef */

//to get password reset link in email
export async function resetPassword(email) {
  const url = process.env.REACT_APP_API_LINK + "/api/forgot-password/";

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      const errorData = await response.json();
      return {
        error: errorData.detail,
        status: response.status,
        actionType: "reset",
      };
    }

    return {
      message: "Password reset email sent",
      status: response.status,
      actionType: "reset",
    };
  } catch (error) {
    return {
      message: "Failed to reset password",
      status: 500,
      actionType: "reset",
    };
  }
}

//to set new password from reset link
export async function setNewPassword(password, token) {
  const url =
    process.env.REACT_APP_API_LINK + "/api/reset-password/" + token + "/";

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      new_password: password,
    }),
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      const errorData = await response.json();
      return {
        error: errorData.detail,
        status: response.status,
        message: "Invalid or expired token",
      };
    }

    return {
      message: "Password reset successfully",
      status: response.status,
    };
  } catch (error) {
    return {
      message: "Failed to reset password",
      status: 500,
    };
  }
}

//to set new password from user's profile
export async function updatePasswordFromProfile(
  email,
  currentPassword,
  newPassword
) {
  const accessToken = localStorage.getItem("access");
  const url = process.env.REACT_APP_API_LINK + "/api/change-password/";
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      current_password: currentPassword,
      new_password: newPassword,
    }),
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      const errorData = await response.json();
      return {
        message: errorData.detail || errorData.error,
        status: response.status,
      };
    }
    return {
      message: "Password updated successfully",
      status: response.status,
    };
  } catch (error) {
    return {
      message: "Failed to update password",
      status: 500,
    };
  }
}
