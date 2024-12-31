import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from '../api/base';

// Define the structure of a user
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

// Define the state for explore users
interface ExploreState {
  data: User[] | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: ExploreState = {
  data: null,
  loading: true,
  error: null,
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

// Thunk to fetch filtered users (explore feature)
export const fetchFilteredExplore = createAsyncThunk(
  'explore/fetchFilteredExplore',
  async (
    {
      userId,
      ageRange,
      city,
      country,
      languages,
    }: {
      userId: string;
      ageRange?: string; // Optional parameters
      city?: string;
      country?: string;
      languages?: string;
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
      });

      // Make the API call to fetch filtered users
      const response = await axios.get(`/users/filter/${userId}?${queryParams}`);
      return response.data as User[]; // Returning an array of User objects
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch filtered users');
    }
  }
);

// Create the explore slice
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
      .addCase(fetchFilteredExplore.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchFilteredExplore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch filtered users';
      });
  },
});

export const { removeUserFromState } = exploreSlice.actions;

export default exploreSlice.reducer;
