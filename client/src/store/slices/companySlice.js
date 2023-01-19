import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  adress: null,
  service: null,
  numOfEmployees: null,
  description: null,
  type: null,
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompany(state, action) {
      state.name = action.payload.name;
      state.adress = action.payload.adress;
      state.service = action.payload.service;
      state.numOfEmployees = action.numOfEmployees;
      state.description = action.description;
      state.type = action.payload.type;
    },
    removeCompany(state) {
      state.name = null;
      state.adress = null;
      state.service = null;
      state.numOfEmployees = null;
      state.description = null;
      state.type = null;
    },
  },
});

export const { setCompany, removeCompany } = companySlice.actions;

export default companySlice.reducer;
