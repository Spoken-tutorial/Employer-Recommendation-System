export function newLoginLocalStorage(refresh, access) {
  let status = false;
  try {
    localStorage.clear();
    localStorage.setItem("refresh", refresh);
    localStorage.setItem("access", access);
    status = true;
  } catch (err) {
    status = false;
  }
  return status;
}
