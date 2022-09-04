import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/User/userSlice'
import storage from 'redux-persist/lib/storage';
import {
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
  } from 'redux-persist'

const persistConfig = {
	key: 'root',
	storage,
  }
const persistedReducer = persistReducer(persistConfig,userReducer)

export const store = configureStore({
  reducer: {user:persistedReducer},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;