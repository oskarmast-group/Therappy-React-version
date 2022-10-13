export const addDays = (date, days) => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

export const dayOfTheWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];


export const timeStringFromHourInt = (hour) => `${hour < 13 ? hour : hour-12}:00 ${hour < 13 ? 'AM' : 'PM'}`