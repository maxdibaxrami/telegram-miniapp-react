import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from '../api/base';

// Define the structure of a user (same as before)
interface User {
  id: number;
  telegramId: string;
  username: string;
  firstName: string;
  lastName: string | null;
  city: string;
  country: string;
  languages: string[];
  interests: string[];
  height: number;
  premium: boolean;
  activityScore: number | null;
  gender: string;
  lookingFor: string;
  relationStatus: string;
  sexuality: string;
  education: string;
  work: string;
  hobbies: string | null;
  profileViews: number;
  lastActive: string | null;
  bio: string;
  verifiedAccount: boolean;
  blockedUsers: string[] | null;
  favoriteUsers: string[] | null;
  isDeleted: boolean;
  language: string;
  lat: string | null;
  lon: string | null;
  age: number | null;
  languagePreferences: string[] | null;
  photos: { id: number; url: string; order: number }[]; // Photos array
}

interface ExploreState {
  data: User[] | null;
  loading: boolean;
  error: string | null;
  page: number;
  limit: number;
  total: number;
}

// Initial state
const initialState: ExploreState = {
  data: null,
  loading: true,
  error: null,
  page: 1, // Start from the first page
  limit: 10, // Number of users to fetch per page
  total: 0,  // Total number of users available
};

// Utility function to build query params
const buildQueryParams = (params: { [key: string]: any }) => {
  const queryParams = new URLSearchParams();

  // Add only non-empty parameters to the query string
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      queryParams.append(key, value);
    }
  });

  return queryParams.toString();
};

// Thunk to fetch filtered users (explore feature) with pagination
export const fetchFilteredExplore = createAsyncThunk(
  'explore/fetchFilteredExplore',
  async (
    {
      userId,
      ageRange,
      city,
      country,
      languages,
      page,
      limit,
    }: {
      userId: string;
      ageRange?: string; // Optional parameters
      city?: string;
      country?: string;
      languages?: string;
      page?: number; // Page for pagination
      limit?: number; // Limit per page for pagination
    },
    { rejectWithValue }
  ) => {
    try {
      // Build the query string with non-empty params
      const queryParams = buildQueryParams({
        ageRange,
        city,
        country,
        languages,
        page,
        limit,
      });

      // Make the API call to fetch filtered users with pagination
      const response = await axios.get(`/users/filter/${userId}?${queryParams}`);
      return response.data as { users: User[]; total: number }; // Return users and total count
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch filtered users');
    }
  }
);

// Create the explore slice with pagination and dynamic data fetching
const exploreSlice = createSlice({
  name: 'explore',
  initialState,
  reducers: {
    // Action to remove a user from the state based on userId
    removeUserFromState: (state, action: PayloadAction<number>) => {
      state.loading = true;
      if (state.data) {
        // Filter out the user based on the userId provided
        state.data = state.data.filter((user) => user.id !== action.payload);
        state.loading = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch filtered users cases
      .addCase(fetchFilteredExplore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilteredExplore.fulfilled, (state, action: PayloadAction<{ users: User[]; total: number }>) => {
        state.loading = false;
        state.total = action.payload.total;
        
        // If there's already data, concatenate the new data (pagination)
        if (state.data && state.data.length) {
          state.data = [...state.data, ...action.payload.users];
        } else {
          state.data = action.payload.users;
        }
        state.page += 1; 

      })
      .addCase(fetchFilteredExplore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch filtered users';
      });
  },
});

export const { removeUserFromState } = exploreSlice.actions;

export default exploreSlice.reducer;