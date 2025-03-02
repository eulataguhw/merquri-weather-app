import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { CurrentWeather, SearchHistory } from '~/types/reducers';

const initialState: { currentWeather: any; searchHistory: SearchHistory[] } = {
    currentWeather: {},
    searchHistory: []
};

export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        updateCurrentWeather: (state, action: PayloadAction<CurrentWeather>) => {
            return { ...state, currentWeather: { ...action.payload } };
        },
        updateSearchHistory: (state, action: PayloadAction<SearchHistory>) => {
            return { ...state, searchHistory: [...state.searchHistory, action.payload] };
        },
        deleteSearchHistory: (state, action: PayloadAction<number>) => {
            const newSearchHistory = [...state.searchHistory];
            newSearchHistory.splice(action.payload, 1);
            return { ...state, searchHistory: newSearchHistory };
        }
    }
});

export const { updateCurrentWeather, updateSearchHistory, deleteSearchHistory } = weatherSlice.actions;

export default weatherSlice.reducer;
