import React from 'react';
import { CardExpiryElement } from '@stripe/react-stripe-js';
import { OPTIONS } from './styles';
import { Body } from 'components/Text';

const Expiration = () => {
  return (
    <div>
      <Body style={{ fontWeight: 700 }}>Expiración</Body>
      <CardExpiryElement options={OPTIONS} />
    </div>
  );
};

export default Expiration;
