import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUser = createAsyncThunk("user/getUser", async function () {
  const res = await axios.get("http://localhost:3000/api/user", {
    withCredentials: true,
  });
  localStorage.setItem("email", res.data.email);
  return res.data;
});

const initialState = {
  email: null,
  id: null,
  firstName: null,
  lastName: null,
  phone: null,
  nickname: null,
  description: null,
  position: null,
  isAuth: false,
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.phone = action.payload.phone;
      state.nickname = action.payload.nickname;
      state.description = action.payload.description;
      state.position = action.payload.position;
      state.isAuth = true;
    },
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
      state.firstName = null;
      state.lastName = null;
      state.phone = null;
      state.nickname = null;
      state.description = null;
      state.position = null;
      state.isAuth = false;
    },
  },
  extraReducers: {
    [getUser.pending]: (state) => {
      state.isLoading = true;
    },
    [getUser.fulfilled]: (state, action) => {
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.phone = action.payload.phone;
      state.nickname = action.payload.nickname;
      state.description = action.payload.description;
      state.position = action.payload.position;
      state.isAuth = true;
      state.isLoading = false;
    },
    [getUser.rejected]: (state) => {
      state.email = null;
      state.id = null;
      state.firstName = null;
      state.lastName = null;
      state.phone = null;
      state.nickname = null;
      state.description = null;
      state.position = null;
      state.isAuth = false;
      state.isLoading = false;
      localStorage.removeItem("email");
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
