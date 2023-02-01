import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true,
});

export const getCompanies = createAsyncThunk(
  "company/getCompanies",
  async function (userId) {
    const res = await axiosInstance.post(
      "http://localhost:3000/companies/all",
      {
        userId: userId,
      }
    );
    return res.data;
  }
);

export const getCompany = createAsyncThunk(
  "company/getCompany",
  async function (id) {
    const res = await axiosInstance.get(
      `http://localhost:3000/companies/${id}`
    );

    return res.data;
  }
);

export const createCompany = createAsyncThunk(
  "company/createCompany",
  async function (company) {
    const res = await axiosInstance.post(
      "http://localhost:3000/companies",
      company
    );

    return res.data;
  }
);

export const editCompany = createAsyncThunk(
  "company/editCompany",
  async function (company) {
    const res = await axiosInstance.patch(
      `http://localhost:3000/companies/${company.id}`,
      company
    );

    return res.data[1][0];
  }
);

export const deleteCompany = createAsyncThunk(
  "company/deleteCompany",
  async function (id) {
    await axiosInstance.delete(`http://localhost:3000/companies/${id}`);
  }
);

export const sortBy = createAsyncThunk(
  "company/sortBy",
  async function (sortBy) {
    const res = await axiosInstance.post(
      "http://localhost:3000/companies/sort",
      sortBy
    );

    return res.data;
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
      state.company = action.payload;
    },
    removeCompany(state) {
      state.company = {};
    },
  },
  extraReducers: {
    [getCompanies.pending]: (state) => {
      state.isLoading = true;
    },
    [getCompanies.fulfilled]: (state, action) => {
      state.companies = action.payload;
      state.isLoading = false;
      return state;
    },
    [getCompanies.rejected]: (state) => {
      state.companies = [];
      state.isLoading = false;
    },
    [createCompany.pending]: (state) => {
      state.isLoading = true;
    },
    [createCompany.fulfilled]: (state, action) => {
      state.companies.push(action.payload);
      state.isLoading = false;
    },
    [createCompany.rejected]: (state) => {
      return state;
    },
    [getCompany.pending]: (state) => {
      state.isLoading = true;
    },
    [getCompany.fulfilled]: (state, action) => {
      state.company = action.payload;
      state.isLoading = false;
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
      return { ...state, company: action.payload, companies: newCompanies };
    },
    [deleteCompany.fulfilled]: (state, action) => {
      const newCompanies = [...state.companies];
      const removeIndex = newCompanies.findIndex(
        (company) => company.id === action.payload
      );
      if (removeIndex === -1) {
        return state;
      }

      const deletedCompany = newCompanies.splice(removeIndex, 1);
      return { ...state, companies: deletedCompany, company: {} };
    },
    [sortBy.fulfilled]: (state, action) => {
      state.companies = action.payload;
    },
  },
});

export const { setCompany, removeCompany } = companySlice.actions;

export default companySlice.reducer;
