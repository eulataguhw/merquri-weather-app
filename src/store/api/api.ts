import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IGeoCodeResult } from '~/types/queries';
import { CurrentWeather } from '~/types/reducers';

const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

export const weatherApi = createApi({
    reducerPath: 'weatherApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://api.openweathermap.org/' }),
    keepUnusedDataFor: 300,
    endpoints: (builder) => ({
        fetchGeocode: builder.query<IGeoCodeResult[], string[]>({
            query: (query: string[]) => {
                return `geo/1.0/direct?q=${query.toString()}&appid=${API_KEY}`;
            },
            keepUnusedDataFor: 30
        }),
        fetchCurrentWeather: builder.query<CurrentWeather, { lat: number; lon: number }>({
            query: ({ lat, lon }: { [key: string]: number }) => {
                return `data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
            },
            keepUnusedDataFor: 30
        })
    })
});

export const { useLazyFetchGeocodeQuery, useLazyFetchCurrentWeatherQuery } = weatherApi;
