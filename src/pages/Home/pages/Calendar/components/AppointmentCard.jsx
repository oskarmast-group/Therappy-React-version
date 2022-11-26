import React from 'react';
import { Link } from 'react-router-dom';
import { DARKER_TEXT, GREEN } from 'resources/constants/colors';
import { IMAGES_URL } from 'resources/constants/urls';
import styled from 'styled-components';
import NoProfileSVG from 'resources/img/no-pic-therapist.png';
import { getStatusText } from 'utils/text';
import { getStatusColor } from 'utils';

const Container = styled.div`
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
                margin-bottom: 5px;
            }
            p {
                font-weight: 600;
                margin: 0;
            }
        }
    }
`;

const AppointmentCard = ({ app }) => {
    return (
        <Container>
            <Link to={`/appointment/${app.roomId}`}>
                <div className="image-container">
                    <img
                        src={
                            app.profileImg
                                ? `${IMAGES_URL}${app.profileImg}`
                                : NoProfileSVG
                        }
                        alt={`perfil de ${app.name} ${app.lastName}`}
                    />
                </div>
                <div className="information">
                    <div className="texts">
                        <h4>{`${app.title ?? ''} ${app.name} ${app.lastName}`}</h4>
                        <p style={{ color: getStatusColor(app) }}>{getStatusText(app)}</p>
                    </div>
                </div>
            </Link>
        </Container>
    );
};

export default AppointmentCard;
