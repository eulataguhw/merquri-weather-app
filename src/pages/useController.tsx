/**
 * Controller for the Model
 */
import { SetStateAction, useCallback } from 'react';
import { useLazyFetchGeocodeQuery } from '~/store/api/api';
import { useAppDispatch } from '~/store/hooks/hooks';
import { useLazyFetchCurrentWeatherQuery } from '~/store/api/api';
import { updateCurrentWeather, updateSearchHistory, deleteSearchHistory } from '~/store/slices/weatherSlice';
import { Coordinates, CurrentWeather, SearchHistory } from '~/types/reducers';

import { convertEpochToDate } from '~/utility/functions';
import { message } from '~/store/slices/messageSlice';
import { WEATHER_INPUT } from '~/resources/form-constants';

const useController = (setter: { [key: string]: React.Dispatch<SetStateAction<any>> }) => {
    const [fetchGeoCode] = useLazyFetchGeocodeQuery();
    const [fetchCurrentWeather] = useLazyFetchCurrentWeatherQuery();
    const dispatch = useAppDispatch();
    /**
     * Retrieve the Geo Code.
     * @param city the city to search for
     * @param country the country to search for
     * @returns
     */
    const getGeoCode = async (city: string, country: string) => {
        return fetchGeoCode([city, country].filter(Boolean)).unwrap();
    };
    /**
     * Get the current weather data
     * @param lat latitude from the geocode
     * @param lon longitude from the geocode
     * @returns
     */
    const getCurrentWeather = async (lat: number, lon: number) => {
        return fetchCurrentWeather({ lat, lon }).unwrap();
    };

    /**
     * updates message slice
     * @param id
     * @param value
     * @param type
     * @param showMessage
     */
    const updateMessage = (id: string, value: { [key: string]: any }, type: '', showMessage: boolean) => {
        dispatch(
            message({
                message: { id, value, type },
                showMessage: showMessage
            })
        );
    };

    /**
     * Update the weatherSlice - current weather and search history
     * @param currentWeather
     */
    const updateSearchResult = (currentWeather: any) => {
        const searchHistory: SearchHistory = {
            name: currentWeather.name,
            country: currentWeather.sys.country,
            coord: currentWeather.coord,
            timestamp: convertEpochToDate(currentWeather.dt)
        };
        dispatch(updateCurrentWeather(currentWeather as CurrentWeather));
        dispatch(updateSearchHistory(searchHistory));
    };

    /**
     * Update search state on change.
     */
    const handleOnSearchChange = useCallback((value: string, control: string) => {
        setter.setWeatherForm((data: { [key: string]: any }) => {
            return {
                ...data,
                [control]: { ...data[control], value }
            };
        });
        updateMessage('common.error', {}, '', false);
    }, []);

    /**
     * Handle on click of search button
     * Call the geo code api from openweathermap to retrieve the lat lon of location
     * Use the latlon to retrieve current weather of the location
     * Dispatch the data to redux store
     */
    const handleOnSearch = useCallback(
        async (city: string, country: string) => {
            try {
                const geoCode = await getGeoCode(city, country);
                if (geoCode.length) {
                    const currentWeather = await getCurrentWeather(geoCode[0].lat, geoCode[0].lon);
                    updateSearchResult(currentWeather);
                } else {
                    // show error if no geo code result
                    updateMessage('common.error', {}, '', true);
                }
            } catch (error) {
                // show error if there's an error
                // this require error maintenance module for proper error handling and message
                updateMessage('common.error', {}, '', true);
                console.error('error: ', error);
            }
        },
        [fetchGeoCode]
    );

    /**
     * Handle on click of search in history
     */
    const handleOnHistorySearch = useCallback(
        async (coords: Coordinates) => {
            const currentWeather = await getCurrentWeather(coords.lat, coords.lon);
            updateSearchResult(currentWeather);
        },
        [updateSearchResult, getCurrentWeather]
    );

    /**
     * Handle removal of search history data
     */
    const handleOnDelete = useCallback((index: number) => {
        dispatch(deleteSearchHistory(index));
    }, []);

    /**
     * Clear the form
     */
    const handleOnClear = useCallback(() => {
        setter.setWeatherForm({ city: WEATHER_INPUT, country: WEATHER_INPUT });
    }, []);

    return {
        getCurrentWeather,
        getGeoCode,
        handleOnSearchChange,
        handleOnSearch,
        handleOnHistorySearch,
        handleOnDelete,
        handleOnClear
    };
};

export default useController;
