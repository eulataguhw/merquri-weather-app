import { FormattedMessageType } from './CommonTypes';

export interface ReducerData {
    contents: string[];
}

export type ReduxActionData<T> = {
    type: any;
    payload?: T;
};

export type ReduxAction<T> = (data: T) => ReduxActionData<T>;

export type Coordinates = {
    lon: number;
    lat: number;
};

export type WeatherWindInformation = {
    speed: number;
    deg: number;
    gust: number;
};

export type CurrentWeather = {
    coord: Coordinates;
    weather: [
        {
            id: number;
            main: string;
            description: string;
            icon: string;
        }
    ];
    base: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
        sea_level: number;
        grnd_level: number;
    };
    visibility: number;
    wind: {
        speed: number;
        deg: number;
        gust: number;
    };
    rain: {
        [key: string]: number;
    };
    clouds: {
        all: number;
    };
    dt: number;
    sys: {
        type: number;
        id: number;
        country: string;
        sunrise: number;
        sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
};

export type SearchHistory = {
    name: string;
    country: string;
    coord: Coordinates;
    timestamp: string;
};

export type MessageType = { showMessage: boolean; message: FormattedMessageType };
