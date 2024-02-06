/* eslint-disable no-undef */
export async function getHomePage() {
  const response = await fetch(
    process.env.REACT_APP_API_LINK + "/api/homepage?format=json"
  );
  if (!response.ok) {
    throw { message: "Failed to fetch homepage", status: 500 };
  }
  const jsonData = await response.json();
  return jsonData;
}
