import React, { useMemo } from 'react';
import styled from 'styled-components';
import StarSVG from 'resources/img/icons/star-icon.svg'
import HalfStarSVG from 'resources/img/icons/star-half-icon.svg';
import EmptyStarSVG from 'resources/img/icons/star-empty.svg';
import { DARKER_TEXT } from 'resources/constants/colors';

const RatingInfoContainer = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    .stars {
        display: flex;
        gap: 5px;
    }
    p {
        margin: 0;
        font-size: 12px;
        color: ${DARKER_TEXT};
        user-select: none;
    }
`;

const getStar = (reviewAvg, i) => {
    const value = +reviewAvg;
    const halfPoint = i - 1 + 0.499;
    if (value >= i) return StarSVG;
    if (value > halfPoint) return HalfStarSVG;
    return EmptyStarSVG;
};

const getStarsArray = (reviewAvg) => {
    if (!reviewAvg) return;
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(getStar(reviewAvg, i));
    }
    return stars;
};

const RatingStars = ({ reviewAvg, reviewsCount }) => {
    const stars = useMemo(() => getStarsArray(reviewAvg), [reviewAvg]);
    return (
        <RatingInfoContainer>
            {!!reviewAvg && (
                <div className="stars">
                    {stars.map((icon, i) => (
                        <img key={i} src={icon} alt="icono estrella" />
                    ))}
                </div>
            )}
            {!!reviewAvg && <p>{reviewAvg}</p>}
            {reviewsCount > 0 ? <p>{reviewsCount} reseñas</p> : <p>Aún no hay reseñas</p>}
        </RatingInfoContainer>
    );
};

export default RatingStars;
