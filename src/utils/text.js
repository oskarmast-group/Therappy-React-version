import { daysInOrder } from './time';

export const getStatusText = ({status}) => {
    switch(status) {
        case 'confirmed':
            return "Solicitada";
        case 'accepted':
            return "Aceptada";
        case 'rejected':
            return "Rechazada";
        case 'completed':
            return "Finalizada";
        case 'cancelled':
            return "Cancelada";
        default:
            return '';
    }
}

export const tranlateDay = {
    monday: 'Lunes',
    tuesday: 'Martes',
    wednesday: 'Miércoles',
    thursday: 'Jueves',
    friday: 'Viernes',
    saturday: 'Sábado',
    sunday: 'Domingo',
};

export const dayOfTheWeekTranslated = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

export const dayOfTheWeekTranslatedAbr = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];

export const timeAvailabilityToString = ({ hours }) => {
    const days = [];
    for (const day of daysInOrder) {
        const hour = hours[day];
        if (hour !== null) days.push(tranlateDay[day]);
    }

    const last = days.pop();

    return { days: days.length > 0 ? `${days.join(', ')} y ${last}` : last };
};

export const capitalize = (string) =>
    string
        .split(' ')
        .map((item) => item.charAt(0).toLocaleUpperCase() + item.slice(1))
        .join(' ');

export const formatMoney = (amount, decimalCount = 2, decimal = '.', thousands = ',', currencySymbol = '$') => {
    try {
        const negativeSign = amount < 0 ? '-' : '';
        const amountFixed = Math.abs(amount).toFixed(decimalCount);
        const amountRounded = parseInt(amountFixed);
        const amountDecimal = parseInt((amountFixed % 1).toFixed(decimalCount) * 100).toString();

        const amountLength = amountRounded.toString().length;
        const thousandPartsCount = Math.floor(amountLength / 3);
        const thousandsPartsModulus = amountLength % 3;

        const parts = [];
        for (let i = 1; i <= thousandPartsCount; i++) {
            parts.unshift(amountRounded.toString().substring(amountLength - i * 3, amountLength - i * 3 + 3));
        }
        if (thousandsPartsModulus !== 0) {
            parts.unshift(amountRounded.toString().substring(0, thousandsPartsModulus));
        }
        return (
            negativeSign +
            currencySymbol +
            (amountLength <= 3 ? amountRounded : parts.join(thousands)) +
            decimal +
            (amountDecimal < 10 ? `0${amountDecimal}` : amountDecimal)
        );
    } catch (e) {
        console.error(e);
    }
};
