/**
 * Model for UI
 */
import React, { useMemo } from 'react';
import { TYPOGRAPHY_TYPES } from '~/resources/common-constants';
import { IModelProps, ISearchHistoryItemProps, ITextInput } from '~/types/CommonTypes';
import useController from './useController';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { SearchHistory } from '~/types/reducers';

const useModel = (props: IModelProps) => {
    const { getter, setter } = props;
    const { handleOnSearchChange, handleOnSearch, handleOnHistorySearch, handleOnDelete, handleOnClear } = useController({
        setWeatherForm: setter.setWeatherForm
    });
    const { weatherForm } = getter;

    /**
     * Search City model
     */
    const searchCityModel: ITextInput = useMemo(
        () => ({
            message: {
                id: 'main.search.label.city',
                type: TYPOGRAPHY_TYPES.FIELD_LABEL
            },
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleOnSearchChange(e.target.value, 'city'),
            value: weatherForm.city.value
        }),
        [weatherForm.city, handleOnSearchChange]
    );
    /**
     * Search Country  model
     */
    const searchCountryModel: ITextInput = useMemo(
        () => ({
            message: {
                id: 'main.search.label.country',
                type: TYPOGRAPHY_TYPES.FIELD_LABEL
            },
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleOnSearchChange(e.target.value, 'country'),
            value: weatherForm.country.value
        }),
        [weatherForm.country, handleOnSearchChange]
    );

    /**
     * Search Button Model
     */
    const searchButtonModel = useMemo(
        () => ({
            sx: { borderRadius: 5, background: '#6C40B5', width: 50, height: 50 },
            icon: <SearchIcon sx={{ color: 'white' }} />,
            onClick: () => handleOnSearch(weatherForm.city.value, weatherForm.country.value)
        }),
        [weatherForm]
    );

    /**
     * Clear Button Model
     */
    const clearButtonModel = useMemo(
        () => ({
            sx: { borderRadius: 5, background: '#6C40B5', width: 50, height: 50 },
            icon: <ClearIcon sx={{ color: 'white' }} />,
            onClick: handleOnClear
        }),
        [weatherForm]
    );

    /**
     * Search History Model
     */
    const searchHistoryModel: ISearchHistoryItemProps[] = useMemo(
        () =>
            getter.searchHistory.map((history: SearchHistory, i: number) => ({
                location: {
                    id: 'main.weather.view.today.searchHistory.location',
                    type: TYPOGRAPHY_TYPES.LABEL,
                    value: {
                        location: history.name,
                        country: history.country
                    }
                },
                date: {
                    id: 'main.weather.view.today.searchHistory.timestamp',
                    type: TYPOGRAPHY_TYPES.LABEL,
                    value: {
                        timestamp: history.timestamp
                    }
                },
                onSearch: () => handleOnHistorySearch(history.coord),
                onDelete: () => handleOnDelete(i)
            })),
        [getter.searchHistory]
    );
    return {
        searchCityModel,
        searchCountryModel,
        searchButtonModel,
        clearButtonModel,
        searchHistoryModel
    };
};

export default useModel;
