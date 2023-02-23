import axios from "axios";

export async function verifyLogin() {
  
  let result;

  let accessToken = localStorage.getItem("accessToken");

  if (accessToken !== undefined && accessToken !== "" && accessToken !== null) {
    let response = await axios.post(
      // `${process.env.BACKEND_URL}/users/verifyLogin`,
      `${process.env.REACT_APP_BACKEND_BASE}/users/verifyLogin`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.data.status) {

      result = true;
    } else {
      result = false;
    }
  } else {
   
    result = false;
  }
  
  return result;
}

export async function logoutFunction() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  goTo("login");
}

export function goTo(page) {
  window.location.href = `http://localhost:3000/${page}`;
}
