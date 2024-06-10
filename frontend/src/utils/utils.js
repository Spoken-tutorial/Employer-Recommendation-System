/* eslint-disable no-undef */
import { redirect } from "react-router-dom";
import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL;
export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function requireAuth(request) {
  const isLoggedIn = localStorage.getItem("loggedIn");
  const pathName = new URL(request.url).pathname;
  // localStorage.getItem('loggedIn');
  if (isLoggedIn !== "true") {
    // throw redirect('/login?message=You are required to login to view this page');
    throw redirect(`/login?redirectTo=${pathName}`);
  } else {
    console.log("logged in so pathName", pathName);
  }
  console.log("loader of approve company reg");
  // return null
}

export async function handleCityDropdownOpen(states, setCity) {
  const state_ids = states.map((state) => state.value);
  try {
    const url = `${baseUrl}/api/utils/cities/?states[]=${state_ids.join(
      "&states[]="
    )}`;
    const response = await axios.get(url);
    const cities = response.data.cities;
    const options = cities.map((city) => {
      return { value: city.id, label: city.name };
    });
    setCity(options);
  } catch (error) {
    console.log("error", error);
  }
  console.log("handleCityDropdownOpen");
  console.log("states", states);
}

export const graduation_years = () => {
  const range = 4;
  const years = [];
  const currentYear = new Date().getFullYear();
  for(let i = currentYear - range;  i <= currentYear + range ; i++){
    years.push({ value: i, label: i.toString() });
  }
  return years;
}