import React from 'react';
import { Link } from 'react-router-dom';
import { DARKER_TEXT, GREEN } from 'resources/constants/colors';
import { IMAGES_URL } from 'resources/constants/urls';
import styled from 'styled-components';
import NoProfileSVG from 'resources/img/no-pic-therapist.png';
import { getDisplayDate } from 'utils/date';
import Button from 'components/Button';
import useAppointments from 'state/appointments';
import { Ring } from '@uiball/loaders';
import { getStatusColor } from 'utils';
import { getStatusText } from 'utils/text';
import { getDisplayTime } from 'utils/time';
import { add } from 'date-fns';

const Container = styled.div`
    margin: 0;
    border: 1px solid ${GREEN};
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 10px;
    a {
        display: flex;
        gap: 10px;
        color: ${DARKER_TEXT};
        text-decoration: none;
        width: 100%;

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
                    font-size: 18px;
                    user-select: none;
                    margin-bottom: 5px;
                    margin: 0;
                }
                p {
                    margin: 0;
                }
                .status {
                    font-weight: 600;
                }
            }
        }
    }
`;

const AppointmentCard = ({ app }) => {
    const [appointments, appointmentsDispatcher] = useAppointments();

    const onAccept = (id) => {
        console.log('accept');
        appointmentsDispatcher.acceptStart({ appointmentId: id });
    };

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
                        <h4>{`${app.title ?? ''} ${app.name} ${
                            app.lastName
                        }`}</h4>
                        <p>{getDisplayDate(app.date, 'EEEE - MMMM d, yyyy')}</p>
                        <p>{getDisplayTime(app.date)} - {getDisplayTime(add(new Date(app.date), { minutes: 50 }))}</p>
                        <p style={{ color: getStatusColor(app) }}>{getStatusText(app)}</p>
                    </div>
                </div>
            </Link>
        </Container>
    );
};

export default AppointmentCard;
