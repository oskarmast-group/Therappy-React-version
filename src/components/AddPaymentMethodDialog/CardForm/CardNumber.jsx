import React from 'react';
import { CardNumberElement } from '@stripe/react-stripe-js';
import { OPTIONS } from './styles';

const CardNumber = ({ onChange }) => {
  return <CardNumberElement options={OPTIONS} onChange={onChange} />;
};

export default CardNumber;
