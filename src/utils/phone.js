import { parsePhoneNumber, isValidPhoneNumber } from 'react-phone-number-input';

export const getFullPhoneNumber = (countryCode, number) => {
    return `${getFormattedCountryCode(countryCode)} ${number}`;
};

export const getFormattedCountryCode = (countryCode) => {
    return `+${countryCode}`;
};

export const isValidNumber = (countryCode, number) => {
    try {
        const formNumber = getFullPhoneNumber(countryCode, number);
        const parsedNumber = parsePhoneNumber(formNumber);
        return !!parsedNumber && isValidPhoneNumber(formNumber);
    } catch (e) {
        return false;
    }
};
