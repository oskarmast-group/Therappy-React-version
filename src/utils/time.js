import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { dateFormat } from './date';

export const TIME_FORMAT = 'kk:mm';

export const DISPLAY_TIME_FORMAT = 'h:mm a';

export const dateObjectFromString = (time) => {
    return new Date(`${dateFormat(new Date())}T${time}`);
}

export const addDays = (date, days) => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

export const timeFormat = (date, FORMAT = TIME_FORMAT) => {
    const dateFormatted = format(!!date ? new Date(date) : new Date(), FORMAT, {
        locale: es,
    });
    
    return dateFormatted;
};

export const getDisplayTime = (date, format = DISPLAY_TIME_FORMAT) => {
    return timeFormat(new Date(date), format);
};

export const dayOfTheWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

export const daysInOrder = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday']

export const timeStringFromHourInt = (hour) => `${hour < 13 ? hour : hour-12}:00 ${hour < 13 ? 'AM' : 'PM'}`