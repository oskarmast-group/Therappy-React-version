import React from 'react';
import styled from 'styled-components';
import VisaSVG from 'resources/img/cards/card-visa.svg';
import AmexSVG from 'resources/img/cards/card-amex.svg';
import MastercardSVG from 'resources/img/cards/card-mastercard.svg';
import GenericSVG from 'resources/img/cards/card-generic.svg';
import CARD_BRANDS from 'resources/constants/cardBrands';
import DeleteSVG from 'resources/img/icons/delete-icon.svg';
import { DARKER_TEXT, GREEN } from 'resources/constants/colors';
import { useAlert } from 'alert';
import useUser from 'state/user';
import ALERT_TYPES from 'alert/types';

const Container = styled.li`
    list-style: none;
    margin: 0;
    border: 1px solid ${GREEN};
    border-radius: 20px;
    padding: 5px 10px;
    display: flex;
    gap: 10px;
    align-items: center;

    .image-container {
        width: 45px;
        overflow: hidden;
        border-radius: 12px;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .information {
        flex: 1;
        min-height: 50px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 3px;
        .texts {
            color: ${DARKER_TEXT};
            h4 {
                font-size: 16px;
                margin: 0;
                user-select: none;
            }
            p {
                font-size: 12px;
                margin: 0;
                user-select: none;
            }
        }
    }

    .icon-button {
        background-color: transparent;
        border: none;
        outline: none;
        padding: 5px;
        width: 35px;
        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
`;

const getSrc = (brand) => {
    switch (brand) {
        case CARD_BRANDS.AMEX:
            return AmexSVG;
        case CARD_BRANDS.MASTERCARD:
            return MastercardSVG;
        case CARD_BRANDS.VISA:
            return VisaSVG;
        default:
            return GenericSVG;
    }
};

const PaymentMethod = ({ method }) => {
    const alert = useAlert();
    const [user, userDispatcher] = useUser();

    const onDelete = () => {
        alert({
            type: ALERT_TYPES.CONFIRM,
            config: {
                title: 'Eliminar método de pago',
                body: `¿Estás seguro que quieres eliminar el método con terminación ${method.card.last4}?`,
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Eliminar',
            },
        })
            .then(() => {
                userDispatcher.deletePaymentMethodStart(method.id);
            })
            .catch(() => {});
    };

    return (
        <Container>
            <div className="image-container">
                <img
                    src={getSrc(method.card.brand)}
                    alt={`logo de ${method.card.brand}`}
                />
            </div>
            <div className="information">
                <div className="texts">
                    <h4>{`**** **** ${method.card.last4}`}</h4>
                    <p>
                        Expira{' '}
                        {`${method.card.exp_month}/${method.card.exp_year}`}
                    </p>
                </div>
            </div>
            <button type="button" className="icon-button">
                <img src={DeleteSVG} alt={'delete-icon'} onClick={onDelete} />
            </button>
        </Container>
    );
};

export default PaymentMethod;
