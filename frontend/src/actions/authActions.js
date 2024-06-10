import { loginUser } from "../utils/api/login/login";
import { resetPassword } from "../utils/api/ResetPassword/resetPassword";

/**
 * Handles user actions based on the form data received in the request.
 * This function supports two primary actions:
 * 1. User Login: Authenticates the user with the provided email and password,
 *    stores the access and refresh tokens in local storage, and returns the appropriate response.
 * 2. Password Reset: Initiates the password reset process for the provided email and returns the response.
 *
 * @param {Object} request - The request object containing the form data.
 * @returns {Object} - The response object indicating the result of the action.
 */

export async function action({ request }) {
    const formData = await request.formData();
    const actionType = formData.get("actionType");
  
    //login post method
    if (actionType == "login") {
        console.log("LOGIN");
      const username = formData.get("email");
      const password = formData.get("password");
      const response = await loginUser(username, password);
      return response;
    }
    //reset password post method
    else if (actionType == "reset") {
      const email = formData.get("email");
      const response = await resetPassword(email);
      return response;
    }
  }