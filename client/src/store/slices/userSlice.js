import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUser = createAsyncThunk("user/getUser", async function () {
  const res = await axios.get("http://localhost:3000/api/user", {
    withCredentials: true,
  });
  localStorage.setItem("email", res.data.email);
  return res.data;
});

export const editUser = createAsyncThunk(
  "user/editUser",
  async function (user) {
    const res = await axios.post("http://localhost:3000/api/edit", user, {
      withCredentials: true,
    });

    return res.data;
  }
);

const initialState = {
  user: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
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
      state.user.isAuth = true;
    },
    [getUser.fulfilled]: (state, action) => {
      const password = action.payload.password;
      state.user = { password, ...action.payload };
      state.user.isAuth = true;
      state.user.isLoading = false;
    },
    [getUser.rejected]: (state) => {
      state.user = {};
      localStorage.removeItem("email");
    },
    [editUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.user.isAuth = true;
      state.user.isLoading = false;
      delete state.user.password;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
