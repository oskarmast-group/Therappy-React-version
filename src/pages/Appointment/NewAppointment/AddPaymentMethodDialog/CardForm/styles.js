import { DARK_TEXT, GOLDEN, PLACEHOLDER_TEXT, PRIMARY_GREEN } from 'resources/constants/colors';

export const OPTIONS = {
  style: {
    base: {
      color: PRIMARY_GREEN,
      fontFamily: "'Montserrat', sans-serif",
      fontSmoothing: 'antialiased',
      fontSize: '1rem',
      '::placeholder': {
        color: PLACEHOLDER_TEXT,
      },
    },
    invalid: {
      color: 'red',
      iconColor: GOLDEN,
    },
  },
};
