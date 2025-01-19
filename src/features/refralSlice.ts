// src/features/referralSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/base';

// Async thunk for handling the referral API request
export const fetchReferralData = createAsyncThunk(
  'referral/fetchReferralData',
  async (referralId:string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/users/referral/${referralId}/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

const referralSlice = createSlice({
  name: 'referral',
  initialState: {
    data: null,
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReferralData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReferralData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchReferralData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default referralSlice.reducer;
