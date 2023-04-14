import React from 'react';
import InfoSVG from 'resources/img/icons/info-icon.svg';
import { IconButton } from './Button';

const InfoButton = ({
    className,
    style={},
    body,
    onClick = () => {},
    icon = InfoSVG,
    iconAlt = 'info',
}) => {
    return (
        <IconButton
            className={className}
            style={style}
            onClick={onClick}
        >
            <img src={icon} alt={iconAlt} />
            <p>{body}</p>
        </IconButton>
    );
};

export default InfoButton;
