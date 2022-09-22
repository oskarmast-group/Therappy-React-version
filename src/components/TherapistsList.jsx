import React from 'react';
import NoProfileSVG from 'resources/img/no-pic-therapist.png';
import { DARKER_TEXT, GREEN } from 'resources/constants/colors';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const TherapistsContainer = styled.ul`
    display: flex;
    flex-direction: column;
    list-style: none;
    gap: 10px;
    padding: 0;
    flex: 1;
    min-height: 0;
    overflow: scroll;
    padding-bottom: 25px;
    margin-bottom: 0;
    li {
        margin: 0;
        border: 1px solid ${GREEN};
        border-radius: 20px;

        a {
            padding: 10px;
            display: flex;
            gap: 10px;
            align-items: center;
            color: ${DARKER_TEXT};
            text-decoration: none;
        }

        .image-container {
            width: 66px;
            height: 66px;
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
            justify-content: space-between;

            .texts {
                color: ${DARKER_TEXT};
                h4 {
                    font-size: 16px;
                    margin: 0;
                    user-select: none;
                }
            }
        }
    }
`;

const RatingInfoContainer = styled.div`
    display: flex;
    gap: 10px;
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

const Therapist = ({ title, name, lastName, profileImg }) => {
    return (
        <li>
            <Link to={'/'}>
                <div className="image-container">
                    <img
                        src={profileImg ? `${process.env.PUBLIC_URL}/images/${profileImg}` : NoProfileSVG}
                        alt={`perfil de ${name} ${lastName}`}
                    />
                </div>
                <div className="information">
                    <div className="texts">
                        <h4>{`${title} ${name} ${lastName}`}</h4>
                    </div>
                    <RatingInfoContainer>
                        <div className="stars"></div>
                        <p>5.00</p>
                        <p>18 reseñas</p>
                    </RatingInfoContainer>
                </div>
            </Link>
        </li>
    );
};

const TherapistsList = ({ therapists }) => {
    return (
        <TherapistsContainer>
            {therapists.map((ther) => (
                <Therapist key={ther.email} {...ther} />
            ))}
        </TherapistsContainer>
    );
};

export default TherapistsList;
