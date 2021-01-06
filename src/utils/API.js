import Axios from "axios";
export const options = {
  headers: {
    withCredentials: true,
    "Access-Control-Allow-Origin": "*",
  },
};

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};

export const API = Axios.create({
  baseURL: "https://dw17vhiy-waysgallery-api.herokuapp.com/api/v1",
  // baseURL: "http://localhost:5000/api/v1",
});
