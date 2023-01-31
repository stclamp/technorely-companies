import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true,
});

const createAdmin = async () => {
  await axios.get("http://localhost:3000/api/adm");
};

createAdmin();

export const login = async (user) => {
  const res = await axiosInstance.post(
    "http://localhost:3000/api/signin",
    user
  );
  localStorage.setItem("email", res.data.email);

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
  localStorage.removeItem("email");
  return res;
};
