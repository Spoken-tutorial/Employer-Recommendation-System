export async function getHomePage() {
  const response = await fetch(
    "https://ers.spoken-tutorial.org/api/homepage?format=json"
  );
  if (!response.ok) {
    throw { message: "Failed to fetch homepage", status: 500 };
  }
  const jsonData = await response.json();
  return jsonData;
}
