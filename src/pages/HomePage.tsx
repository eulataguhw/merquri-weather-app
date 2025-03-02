/**
 * Main page
 */
import React, { useState } from 'react';
import { Alert, Box, Container, Grid2, Paper } from '@mui/material';
import { TextInput } from '~/components/Inputs/TextInput';
import useModel from './useModel';
import CustomIconButton from '~/components/Buttons/IconButton';
import { CustomTypography } from '~/components/Typographys/CustomTypography';
import { TYPOGRAPHY_TYPES } from '~/resources/common-constants';
import { useAppSelector } from '~/store/hooks/hooks';
import { convertEpochToDate, isEmptyObject } from '~/utility/functions';
import SearchHistoryItem from '~/components/Lists/SearchHistoryList';
import { ISearchHistoryItemProps } from '~/types/CommonTypes';
import { WEATHER_INPUT } from '~/resources/form-constants';

const HomePage: React.FC = () => {
    const weatherStore = useAppSelector((store) => store.weather);
    const messageStore = useAppSelector((store) => store.message);
    const { currentWeather, searchHistory } = weatherStore;
    const { message, showMessage } = messageStore;
    const [weatherForm, setWeatherForm] = useState({ city: WEATHER_INPUT, country: WEATHER_INPUT });
    const { searchCityModel, searchCountryModel, searchButtonModel, clearButtonModel, searchHistoryModel } = useModel({
        getter: { weatherForm, searchHistory },
        setter: { setWeatherForm }
    });

    return (
        <Container maxWidth={false} disableGutters sx={{ height: '100vh' }}>
            {/** Search container */}
            <Grid2 container sx={{ height: '100%' }} justifyContent={'center'} alignItems={'flex-start'}>
                <Grid2 size={12} sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                    <Grid2 container spacing={2} alignItems={'center'} sx={{ width: 700, display: 'flex' }}>
                        <Grid2 size={5}>
                            <TextInput {...searchCityModel} />
                        </Grid2>
                        <Grid2 size={5}>
                            <TextInput {...searchCountryModel} />
                        </Grid2>
                        <Grid2 size={1}>
                            <CustomIconButton {...searchButtonModel} />
                        </Grid2>
                        <Grid2 size={1}>
                            <CustomIconButton {...clearButtonModel} />
                        </Grid2>
                    </Grid2>
                </Grid2>
                {/** Alert Message */}
                <Grid2 container spacing={4} alignItems={'center'} sx={{ width: 700, display: 'flex' }}>
                    <Grid2 size={12}>
                        {showMessage && (
                            <Alert severity="error" variant="outlined" sx={{ borderRadius: 5, backgroundColor: 'rgb(255, 0, 0, 0.1)' }}>
                                <CustomTypography {...{ message }} />
                            </Alert>
                        )}
                    </Grid2>
                </Grid2>

                {/**Weather Information Container*/}
                <Grid2 size={12} sx={{ mt: 0, display: 'flex', justifyContent: 'center' }}>
                    <Paper
                        elevation={1}
                        sx={{ borderRadius: '40px', height: '80vh', width: 700, position: 'relative', backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                    >
                        {/**Inner Container */}
                        {/** Weather Information */}
                        {isEmptyObject(currentWeather) ? (
                            <Grid2 container spacing={2} sx={{ margin: 5 }}>
                                <CustomTypography variant="h1" message={{ id: 'common.noRecord', type: TYPOGRAPHY_TYPES.LABEL }} />
                            </Grid2>
                        ) : (
                            <Grid2 container spacing={2} sx={{ margin: 5 }}>
                                <Grid2 size={12}>
                                    <CustomTypography variant="h1" message={{ id: 'main.weather.view.today.weather', type: TYPOGRAPHY_TYPES.LABEL }} />
                                    <Grid2 container alignItems="baseline" spacing={1}>
                                        <Grid2>
                                            <CustomTypography
                                                variant="h1"
                                                sx={{
                                                    fontWeight: 'bold',
                                                    color: '#6C40B5',
                                                    lineHeight: 1
                                                }}
                                                message={{
                                                    id: 'main.weather.view.today.temperature',
                                                    type: '',
                                                    value: {
                                                        temperature: Number(currentWeather.main.temp).toFixed(1)
                                                    }
                                                }}
                                            />
                                        </Grid2>
                                    </Grid2>
                                    <CustomTypography
                                        variant="body1"
                                        sx={{
                                            color: '#6C40B5'
                                        }}
                                        message={{
                                            id: 'main.weather.view.today.temperature.highLow',
                                            type: TYPOGRAPHY_TYPES.LABEL,
                                            value: {
                                                high: Number(currentWeather.main.temp_max).toFixed(1),
                                                low: Number(currentWeather.main.temp_min).toFixed(1)
                                            }
                                        }}
                                    />
                                    <Grid2 container spacing={2} justifyContent="space-between" sx={{}}>
                                        <Grid2>
                                            <CustomTypography
                                                variant="subtitle1"
                                                sx={{
                                                    fontWeight: 'bold'
                                                }}
                                                message={{
                                                    id: 'main.weather.view.today.weather.location',
                                                    type: TYPOGRAPHY_TYPES.LABEL_GREY,
                                                    value: {
                                                        location: currentWeather.name,
                                                        country: currentWeather.sys.country
                                                    }
                                                }}
                                            />
                                        </Grid2>
                                        <Grid2>
                                            <CustomTypography
                                                variant="subtitle1"
                                                message={{
                                                    id: 'main.weather.view.today.weather.timestamp',
                                                    type: TYPOGRAPHY_TYPES.LABEL_GREY,
                                                    value: {
                                                        timestamp: convertEpochToDate(currentWeather.dt)
                                                    }
                                                }}
                                            />
                                        </Grid2>
                                        <Grid2>
                                            <CustomTypography
                                                variant="subtitle1"
                                                message={{
                                                    id: 'main.weather.view.today.weather.humidity',
                                                    type: TYPOGRAPHY_TYPES.LABEL_GREY,
                                                    value: {
                                                        humidity: currentWeather.main.humidity
                                                    }
                                                }}
                                            />
                                        </Grid2>
                                        <Grid2>
                                            <CustomTypography
                                                variant="subtitle1"
                                                message={{
                                                    id: 'main.weather.view.today.weather.situation',
                                                    type: TYPOGRAPHY_TYPES.LABEL_GREY,
                                                    value: {
                                                        situation: currentWeather.weather[0].main
                                                    }
                                                }}
                                            />
                                        </Grid2>
                                    </Grid2>
                                </Grid2>
                                {/** Weather Icon */}
                                <Box
                                    component="img"
                                    src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@4x.png`}
                                    alt="Cloud Icon"
                                    sx={{
                                        position: 'absolute',
                                        top: -120,
                                        right: -50,
                                        width: 300,
                                        height: 300
                                    }}
                                />
                                {/** Search History */}
                                <Paper
                                    elevation={1}
                                    sx={{ borderRadius: '40px', height: '55vh', width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.2)', overflowY: 'auto' }}
                                >
                                    <Grid2 container sx={{ margin: 3.5 }}>
                                        <Grid2 size={12}>
                                            <CustomTypography
                                                variant="h1"
                                                message={{ id: 'main.weather.view.today.searchHistory', type: TYPOGRAPHY_TYPES.LABEL }}
                                            />
                                            {searchHistoryModel.map((model: ISearchHistoryItemProps, i: number) => (
                                                <SearchHistoryItem key={`${model.location} ${i}`} {...model} />
                                            ))}
                                        </Grid2>
                                    </Grid2>
                                </Paper>
                            </Grid2>
                        )}
                    </Paper>
                </Grid2>
            </Grid2>
        </Container>
    );
};

export default HomePage;
