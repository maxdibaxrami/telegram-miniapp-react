import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from '../api/base';

// Define the shape of the user data
interface Photo {
  url: any;
  id: number;
  order: number;
}

interface ProfileData {
  lookingFor: string;
  education: string;
  work: string;
  bio: string;
}

interface MoreAboutMe {
  languages: string[];
  height: number;
  relationStatus: string;
  sexuality: string;
  kids: string | null;
  smoking: string | null;
  drink: string | null;
  pets: string | null;
}

interface UserData {
  id: number;
  telegramId: string;
  username: string;
  firstName: string;
  city: string;
  profileData: ProfileData;
  moreAboutMe: MoreAboutMe;
  country: string;
  interests: string[];
  premium: boolean;
  activityScore: number | null;
  gender: string;
  profileViews: number;
  lastActive: string | null;
  verifiedAccount: boolean;
  photos: Photo[];
  blockedUsers: string[] | null;
  favoriteUsers: string[] | null;
  age: number;
  languagePreferences: string[] | null;
  isDeleted: boolean;
  language: string;
  lat: string;
  lon: string;
}

// Define the user state
interface UserState {
  data: UserData | null;
  loading: boolean;
  updateUserData: boolean;
  uploadProfileLoading: boolean;
  error: string | null;
}

// Initial state
const initialState: UserState = {
  data: null,
  loading: false,
  updateUserData: false,
  uploadProfileLoading: false,
  error: null,
};

// Thunk to fetch user data
export const fetchUserData = createAsyncThunk(
  'user/fetchData',
  async (userId: string) => {
    const response = await axios.get(`/users/telegram/${userId}`);
    return response.data as UserData; // Explicitly type the response
  }
);

// Thunk to update user data
export const updateUserData = createAsyncThunk(
  'user/updateData',
  async ({ userId, updatedData }: { userId: string; updatedData: Partial<UserData> }) => {
    const response = await axios.patch(`/users/${userId}`, updatedData);
    return response.data as Partial<UserData>; // Explicitly type the response
  }
);

export const updateUserPhoto = createAsyncThunk(
  'user/updatePhoto',
  async ({ userId, photoFile }: { userId: string; photoFile: File }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('file', photoFile);

      const response = await axios.patch(`/photo/update-file/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          maxBodyLength: Infinity
        },
      });

      return response.data as Photo;
    } catch (error: any) {
      return rejectWithValue(error.response.data || 'Failed to update photo');
    }
  }
);

export const uploadProfileImage = createAsyncThunk(
  'auth/uploadProfileImage',
  async ({ userId, imageFile, order }: any) => {

    const formData = new FormData();

    formData.append('file', imageFile);
    formData.append('userId', userId);
    formData.append('order', order);

    const response = await axios.post(`/photo/upload/`, formData,{maxBodyLength: Infinity});
    return response.data;

  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch user data cases
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch user data';
      })
      // Handle user update cases
      .addCase(updateUserData.pending, (state) => {
        state.updateUserData = true;
        state.error = null;
      })
      .addCase(updateUserData.fulfilled, (state, action: PayloadAction<Partial<UserData>>) => {
        state.updateUserData = false;

        if (state.data) {
          state.data = { ...state.data, ...action.payload };
        } else {
          state.data = action.payload as UserData;
        }
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.updateUserData = false;
        state.error = action.error.message || 'Failed to update user data';
      })
      // Handle update user photo cases
      .addCase(updateUserPhoto.pending, (state) => {
        state.uploadProfileLoading = true;
        state.error = null;
      })
      .addCase(updateUserPhoto.fulfilled, (state, action: PayloadAction<Photo>) => {
        state.uploadProfileLoading = false;

        if (state.data) {
          const updatedPhotos = state.data.photos.map(photo => 
            photo.id === action.payload.id ? action.payload : photo
          );

          state.data.photos = updatedPhotos;
        }
      })
      .addCase(updateUserPhoto.rejected, (state, action) => {
        state.uploadProfileLoading = false;
        state.error = action.payload as string || 'Failed to update photo';
      })
      // Handle upload profile image cases
      .addCase(uploadProfileImage.pending, (state) => {
        state.uploadProfileLoading = true;
        state.error = null;
      })
      .addCase(uploadProfileImage.fulfilled, (state, action: PayloadAction<Photo>) => {
        state.uploadProfileLoading = false;

        if (state.data) {
          state.data.photos.push(action.payload);
        }
      })
      .addCase(uploadProfileImage.rejected, (state, action) => {
        state.uploadProfileLoading = false;
        state.error = action.error.message || 'Failed to upload profile image';
      });
  },
});

export default userSlice.reducer;
