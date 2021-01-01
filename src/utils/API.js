export const baseUrl = "https://dw17vhiy-waysgallery-api.herokuapp.com/";
export const options = {
  headers: `${
    localStorage.token
      ? {
          Authorization: localStorage.token,

          withCredentials: true,
          "Access-Control-Allow-Origin": "*",
        }
      : {
          withCredentials: true,
          "Access-Control-Allow-Origin": "*",
        }
  }`,
};
