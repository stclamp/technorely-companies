import axios from "axios";

export const login = async (user) => {
  const res = await axios.post("http://localhost:3000/api/signin", user, {
    withCredentials: true,
  });

  return res.data;
};

export const register = async (user) => {
  const res = await axios.post("http://localhost:3000/api/signup", user, {
    withCredentials: true,
  });

  return res.data;
};

export const getUser = async () => {
  const res = await axios.get("http://localhost:3000/api/user", {
    withCredentials: true,
  });

  return res.data;
};
