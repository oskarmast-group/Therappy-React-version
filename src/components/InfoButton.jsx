import React from 'react';
import { PRIMARY_GREEN } from 'resources/constants/colors';
import styled from 'styled-components';
import InfoSVG from 'resources/img/icons/info-icon.svg';
import { useAlert } from 'alert';
import ALERT_TYPES from 'alert/types';

const Info = styled.button`
    border: none;
    outline: none;
    padding: 10px;
    background-color: ${PRIMARY_GREEN};
    border-radius: 15px;
    display: flex;
    gap: 20px;
    margin: 20px 0;
    cursor: pointer;
    align-items: center;
    img {
        height: 25px;
        width: auto;
    }
    p {
        margin: 0;
        font-size: 14px;
        color: white;
    }
`;

const InfoButton = ({ alertConfig = {}, body }) => {
    const alert = useAlert();
    return (
        <Info
            onClick={() => {
                alert({
                    type: ALERT_TYPES.INFO,
                    config: alertConfig,
                })
                    .then(() => {})
                    .catch(() => {});
            }}
        >
            <img src={InfoSVG} alt="info" />
            <p>{body}</p>
        </Info>
    );
};

export default InfoButton;
