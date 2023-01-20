import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true,
});

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

// export const getCompanies = async () => {
//   const res = await axiosInstance.get("http://localhost:3000/companies");
//   console.log(res.data);
//   return res.data;
// };
