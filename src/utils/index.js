import { GOLDEN, PRIMARY_GREEN, RED } from 'resources/constants/colors';

export const toFormData = (object) => {
    const formdata = new FormData();

    Object.entries(object).forEach(([key, value]) => {
        if (!!value) {
            value =
                typeof value === 'object' && !(value instanceof File)
                    ? JSON.stringify(value)
                    : value;
            formdata.append(key, value);
        }
    });

    return formdata;
};

export const compareStrings = (a, b) =>
    a.trim().toLowerCase().includes(b.trim().toLowerCase());

export const getStatusColor = ({ status }) => {
    switch (status) {
        case 'confirmed':
            return GOLDEN;
        case 'accepted':
            return PRIMARY_GREEN;
        case 'rejected':
            return RED;
        default:
            return '';
    }
};
