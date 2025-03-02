import moment from 'moment';

/**
 * convert epoch to DD-MM-YYYY HH:MM
 * @param value epoch in seconds
 * @returns
 */
export const convertEpochToDate = (value: number) => {
    return moment.unix(value).format('DD-MM-YYYY HH:mma');
};

/**
 * Check if object is empty
 * @param obj obj to test
 * @returns boolean
 */
export const isEmptyObject = (obj: {}) => {
    return Object.getOwnPropertyNames(obj).length === 0;
};
