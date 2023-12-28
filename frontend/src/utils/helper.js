export const get_registration_data = (formData) => {
  const arrayFields = {
    skills: [],
    "foss-mandatory": [],
    "foss-optional": [],
    "filter-state": [],
    "filter-city": [],
    disciplines: [],
    degrees: [],
    years: [],
    "job-city": [],
  };

  for (const [key, value] of formData.entries()) {
    if (Object.prototype.hasOwnProperty.call(arrayFields, key)) {
      arrayFields[key].push(Number(value));
    }
  }

  const registrationData = {
    company: {
      name: formData.get("company_name"),
      website: formData.get("website"),
      is_agency: formData.get("is_agency"),
    },
    user: {
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      username: formData.get("email"),
      password: formData.get("password"),
      confirm_password: formData.get("confirm_password"),
    },
    job: {
      designation: formData.get("designation"),
      num_vacancies: formData.get("num_vacancies"),
      salary_range_min: formData.get("salary_range_min"),
      salary_range_max: formData.get("salary_range_max"),
      description: formData.get("description"),
      key_job_responsibilities: formData.get("key_job_responsibilities"),
      requirements: formData.get("requirements"),
      domain: formData.get("domain"),
      ws: arrayFields.skills,
      wdis: arrayFields.disciplines,
      wdeg: arrayFields.degrees,
      wjob_city: arrayFields["job-city"],
    },
    mandatory_foss: arrayFields["foss-mandatory"],
    optional_foss: arrayFields["foss-optional"],
    filter_state: arrayFields["filter-state"],
    filter_city: arrayFields["filter-city"],
    years: arrayFields.years,
  };
  return registrationData;
};
