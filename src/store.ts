// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import authReducer from './features/authSlice';
import likeReducer from './features/likeSlice';
import matchReducer from './features/matchSlice';
import exploreReducer from './features/exploreSlice'
import conversationsReducer from './features/conversationsSlice'

// Configure the store
export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    like: likeReducer,
    match: matchReducer,
    explore: exploreReducer,
    conversation: conversationsReducer

  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
