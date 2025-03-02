import { configureStore } from '@reduxjs/toolkit';

import weatherReducer from '../slices/weatherSlice';
import messageReducer from '../slices/messageSlice';
import { weatherApi } from '../api/api';
// import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
    reducer: {
        [weatherApi.reducerPath]: weatherApi.reducer,
        weather: weatherReducer,
        message: messageReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(weatherApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

// setupListeners(store.dispatch);
