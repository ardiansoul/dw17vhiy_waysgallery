export const baseUrl = "https://dw17vhiy-waysgallery-api.herokuapp.com/";
export const options = {
  headers: {
    Authorization: localStorage.token,
    withCredentials: true,
    "Access-Control-Allow-Origin": "*",
  },
};
