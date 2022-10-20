import { format, subDays, add } from 'date-fns';
import { es } from 'date-fns/locale';

export const DATE_FORMAT = 'yyyy-MM-dd';
export const DISPLAY_DATE_FORMAT = "d / MMMM / yyyy";

export const dateFormat = (date, FORMAT = DATE_FORMAT, options = {}) => {
    const dateFormatted = format(!!date ? new Date(date) : new Date(), FORMAT, options);
    
    return dateFormatted;
};

const capitalize = string => string.split(" ").map(item => item.charAt(0).toLocaleUpperCase() + item.slice(1)).join(' ')

export const getDisplayDate = (date, format = DISPLAY_DATE_FORMAT) => {
    const dateFormatted = dateFormat(new Date(date), format, {
        locale: es
    });

    return capitalize(dateFormatted);
}

export const addDays = (date, days) => {
    const dateObj = !!date ? new Date(date) : new Date();
    return add(dateObj, { days });
}

export const removeDays = (date, days) => {
    const dateObj = !!date ? new Date(date) : new Date();
    return subDays(dateObj, days);
}