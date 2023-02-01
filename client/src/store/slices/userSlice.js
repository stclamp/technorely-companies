import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true,
});

export const getUser = createAsyncThunk("user/getUser", async function () {
  const res = await axiosInstance.get("http://localhost:3000/api/user");
  localStorage.setItem("email", res.data.email);
  return res.data;
});

export const editUser = createAsyncThunk(
  "user/editUser",
  async function (user) {
    const res = await axiosInstance.post(
      "http://localhost:3000/api/edit",
      user
    );

    return res.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: { user: {} },
  reducers: {
    setUser(state, action) {
      const password = action.payload.password;
      state.user = { password, ...action.payload };
      state.user.isAuth = true;
    },
    removeUser(state) {
      state.user = {};
    },
  },
  extraReducers: {
    [getUser.pending]: (state) => {
      state.user.isLoading = true;
      state.user.isAuth = false;
    },
    [getUser.fulfilled]: (state, action) => {
      const password = action.payload.password;
      state.user = { password, ...action.payload };
      state.user.isAuth = true;
      state.user.isLoading = false;
    },
    [getUser.rejected]: (state) => {
      state.user.isAuth = false;
      state.user.isLoading = false;
      state.user = {};
      localStorage.removeItem("email");
    },
    [editUser.pending]: (state) => {
      state.user.isAuth = false;
      state.user.isLoading = true;
    },
    [editUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.user.isAuth = true;
      state.user.isLoading = false;
      delete state.user.password;
    },
    [editUser.rejected]: (state) => {
      state.user = {};
      state.user.isAuth = false;
      state.user.isLoading = false;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
