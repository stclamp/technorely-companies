import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCompanies = createAsyncThunk(
  "company/getCompanies",
  async function () {
    const res = await axios.get("http://localhost:3000/companies", {
      withCredentials: true,
    });
    return res.data;
  }
);

export const getCompany = createAsyncThunk(
  "company/getCompany",
  async function (id) {
    const res = await axios.get(`http://localhost:3000/companies/${id}`, {
      withCredentials: true,
    });

    return res.data;
  }
);

export const createCompany = createAsyncThunk(
  "company/createCompany",
  async function (company) {
    const res = await axios.post("http://localhost:3000/companies", company, {
      withCredentials: true,
    });

    return res.data;
  }
);

export const editCompany = createAsyncThunk(
  "company/editCompany",
  async function (company) {
    const res = await axios.patch(
      `http://localhost:3000/companies/${company.id}`,
      company
    );

    return res.data[1][0];
  }
);

const companySlice = createSlice({
  name: "company",
  initialState: {
    companies: [],
    company: {},
    isLoading: false,
  },
  reducers: {
    setCompany(state, action) {
      state.createCompany.name = action.payload.name;
      state.createCompany.adress = action.payload.adress;
      state.createCompany.service = action.payload.service;
      state.createCompany.numOfEmployees = action.numOfEmployees;
      state.createCompany.description = action.description;
      state.createCompany.type = action.payload.type;
      state.createCompany.userId = action.payload.userId;
    },
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
      console.log(action.payload);
      state.isLoading = false;
      console.log(state);
      return state;
    },
    [createCompany.fulfilled]: (state, action) => {
      state.companies.push(action.payload);
    },
    [getCompany.fulfilled]: (state, action) => {
      state.company = action.payload;
    },
    [editCompany.fulfilled]: (state, action) => {
      const newCompanies = [...state.companies];
      const editIndex = newCompanies.findIndex(
        (company) => company.id === action.payload.id
      );
      if (editIndex === -1) {
        return state;
      }
      newCompanies[editIndex] = action.payload;
      // state.companies = newCompanies;
      console.log(state.companies);
      return { ...state, companies: newCompanies };
    },
  },
});

export const { setCompany, removeCompany } = companySlice.actions;

export default companySlice.reducer;
