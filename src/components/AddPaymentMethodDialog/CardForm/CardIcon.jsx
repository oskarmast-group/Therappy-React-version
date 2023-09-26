import React from 'react';
import styled from 'styled-components';
import VisaSVG from 'resources/img/cards/card-visa.svg';
import AmexSVG from 'resources/img/cards/card-amex.svg';
import MastercardSVG from 'resources/img/cards/card-mastercard.svg';
import GenericSVG from 'resources/img/cards/card-generic.svg';
import CARD_BRANDS from 'resources/constants/cardBrands';

const Icon = styled.img`
    width: 40px;
    margin-bottom: 5px;
`;

const getSrc = (brand) => {
    switch(brand) {
        case CARD_BRANDS.AMEX:
            return AmexSVG;
        case CARD_BRANDS.MASTERCARD:
            return MastercardSVG;
        case CARD_BRANDS.VISA:
            return VisaSVG;
        default: 
        return GenericSVG;
    }
}

const CardIcon = ({brand}) => {
  return (<Icon src={getSrc(brand)} alt={'selected-card'}/>);
}

export default CardIcon;
