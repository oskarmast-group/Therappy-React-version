import { format, subDays, add, isAfter } from 'date-fns';
import { es } from 'date-fns/locale';
import { capitalize } from './text';

export const DATE_FORMAT = 'yyyy-MM-dd';
export const DISPLAY_DATE_FORMAT = 'd / MMMM / yyyy';

export const dateFormat = (date, FORMAT = DATE_FORMAT) => {
    const dateFormatted = format(!!date ? new Date(date) : new Date(), FORMAT, {
        locale: es,
    });

    return dateFormatted;
};

export const getDisplayDate = (date, format = DISPLAY_DATE_FORMAT) => {
    const dateFormatted = dateFormat(new Date(date), format);

    return capitalize(dateFormatted);
};

export const addDays = (date, days) => {
    const dateObj = !!date ? new Date(date) : new Date();
    return add(dateObj, { days });
};

export const removeDays = (date, days) => {
    const dateObj = !!date ? new Date(date) : new Date();
    return subDays(dateObj, days);
};

export const isDateAfter = (date, dateToCompare) => {
    return isAfter(new Date(date), new Date(dateToCompare));
}