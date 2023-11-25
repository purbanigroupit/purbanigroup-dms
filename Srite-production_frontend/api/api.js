import axios from "axios";
const pb = "development";
export const baseUrl =
  pb === "production"
    ? "https://purbani-dms-backend.vercel.app/api/v1"
    : "http://localhost:5000/api/v1";

// https://purbani-dms-backend.vercel.app/

export const getHeaders = () => ({
  "Content-Type": "application/json",
  "x-auth-token": `${localStorage?.getItem("x-auth-token")}`,
});

export const getHeadersMultiPart = () => ({
  "Content-Type": "multipart/form-data",
  "x-auth-token": `${localStorage.getItem("x-auth-token")}`,
});

export const getLoggedInUser = async () => {
  try {
    const data = await axios.get(baseUrl + "/users/get-logged-in-user", {
      withCredentials: true,
      credentials: "include",
      headers: getHeaders(),
    });
    return data;
  } catch (error) {
    return handleError(error);
  }
};

const getQueryString = (query = {}) => {
  let queryString = "?";
  for (let key in query) {
    queryString = `${queryString}&${key}=${query[key]}`;
  }
  return queryString;
};

const handleError = (error) => {
  const { data, status } = error?.response || {};
  if (status === 400 || 401 || 402 || 403 || 404) {
    console.log(error);
  }
  return { data, status };
};

export const GET = async (route = "", query = {}) => {
  try {
    const queryString = getQueryString(query);
    const apiRoute = `${baseUrl}${route}${queryString}`;
    const { data, status } = await axios.get(apiRoute, {
      withCredentials: true,
      credentials: "include",
      headers: getHeaders(),
    });
    return { data, status };
  } catch (error) {
    return handleError(error);
  }
};

export const POST = async (route = "", body = {}) => {
  try {
    const apiRoute = `${baseUrl}${route}`;

    const { data, status } = await axios.post(apiRoute, body, {
      credentials: "include",
      withCredentials: true,
      headers: getHeaders(),
    });
    return { data, status };
  } catch (error) {
    return handleError(error);
  }
};

export const POSTFORM = async (route = "", body = {}) => {
  try {
    const apiRoute = `${baseUrl}${route}`;
    const { data, status } = await axios.post(apiRoute, body, {
      credentials: "include",
      withCredentials: true,
      headers: getHeadersMultiPart(),
    });
    return { data, status };
  } catch (error) {
    return handleError(error);
  }
};

export const PUT = async (route, body = {}) => {
  try {
    const apiRoute = `${baseUrl}${route}`;
    const { data, status } = await axios.put(apiRoute, body, {
      credentials: "include",
      withCredentials: true,
      headers: getHeaders(),
    });
    return { data, status };
  } catch (error) {
    return handleError(error);
  }
};

export const PUTFORM = async (route = "", body = {}) => {
  try {
    const apiRoute = `${baseUrl}${route}`;
    const { data, status } = await axios.put(apiRoute, body, {
      credentials: "include",
      withCredentials: true,
      headers: getHeadersMultiPart(),
    });
    return { data, status };
  } catch (error) {
    return handleError(error);
  }
};

export const DELETE = async (route) => {
  try {
    const apiRoute = `${baseUrl}${route}`;
    const { data, status } = await axios.delete(apiRoute, {
      credentials: "include",
      withCredentials: true,
      headers: getHeaders(),
    });
    return { data, status };
  } catch (error) {
    return handleError(error);
  }
};
