import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true,
});

export const login = async (user) => {
  const res = await axiosInstance.post(
    "http://localhost:3000/api/signin",
    user
  );

  return res.data;
};

export const register = async (user) => {
  const res = await axiosInstance.post(
    "http://localhost:3000/api/signup",
    user
  );

  return res.data;
};

export const logout = async () => {
  const res = await axiosInstance.post("http://localhost:3000/api/logout");

  console.log(res);
};

export const getUser = async () => {
  const res = await axiosInstance.get("http://localhost:3000/api/user");
  return res.data;
};
