import React from 'react';
import { CardCvcElement } from '@stripe/react-stripe-js';
import { OPTIONS } from './styles';
import { Body } from 'components/Text';

const CVC = () => {
  return (
    <div>
      <Body style={{ fontWeight: 700 }}>CVC</Body>
      <CardCvcElement options={OPTIONS} />
    </div>
  );
};

export default CVC;
