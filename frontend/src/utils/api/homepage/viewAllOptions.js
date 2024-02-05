export async function getViewAllCompanies(pageNum) {
  const response = await fetch(
    "https://ers.spoken-tutorial.org/api/companies/?format=json&page=" + pageNum
  );
  if (!response.ok) {
    throw { message: "Failed to fetch homepage", status: 500 };
  }
  const resp = await response.json();
  return resp;
}

export async function getViewAllEvents(pageNum) {
  const response = await fetch(
    "https://ers.spoken-tutorial.org/events/api/events?format=json&page=" +
      pageNum
  );
  if (!response.ok) {
    throw { message: "Failed to fetch homepage", status: 500 };
  }
  const resp = await response.json();
  return resp;
}

export async function getViewAllTestimonials(pageNum) {
  const response = await fetch(
    "https://ers.spoken-tutorial.org/events/api/testimonials?format=json&page=" +
      pageNum
  );
  if (!response.ok) {
    throw { message: "Failed to fetch homepage", status: 500 };
  }
  const resp = await response.json();
  return resp;
}

