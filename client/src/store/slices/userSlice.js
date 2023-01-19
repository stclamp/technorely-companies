import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  id: null,
  firstName: null,
  lastName: null,
  phone: null,
  numOfEmployees: null,
  nickname: null,
  description: null,
  position: null,
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
      state.numOfEmployees = action.payload.numOfEmployees;
      state.nickname = action.payload.nickname;
      state.description = action.payload.description;
      state.position = action.payload.position;
    },
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
      state.firstName = null;
      state.lastName = null;
      state.phone = null;
      state.numOfEmployees = null;
      state.nickname = null;
      state.description = null;
      state.position = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
