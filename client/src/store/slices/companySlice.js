import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCompanies = createAsyncThunk(
  "company/getCompanies",
  async function () {
    const res = await axios.get("http://localhost:3000/companies", {
      withCredentials: true,
    });
    // console.log(res.data);
    return res.data;
  }
);

// const initialState = [
//   {
//     name: null,
//     adress: null,
//     service: null,
//     numOfEmployees: null,
//     description: null,
//     type: null,
//   },
// ];

const initialState = {
  companies: [],
  isLoading: false,
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    // setCompany(state, action) {
    //   state.name = action.payload.name;
    //   state.adress = action.payload.adress;
    //   state.service = action.payload.service;
    //   state.numOfEmployees = action.numOfEmployees;
    //   state.description = action.description;
    //   state.type = action.payload.type;
    // },
    // removeCompany(state) {
    //   state.name = null;
    //   state.adress = null;
    //   state.service = null;
    //   state.numOfEmployees = null;
    //   state.description = null;
    //   state.type = null;
    // },
  },
  extraReducers: {
    [getCompanies.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getCompanies.fulfilled]: (state, action) => {
      state.companies = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setCompany, removeCompany } = companySlice.actions;

export default companySlice.reducer;
