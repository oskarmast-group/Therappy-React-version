import RatingStars from 'components/RatingStars';
import TopBar from 'components/TopBar';
import MainContainer from 'containers/MainContainer';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { DARKER_TEXT, PRIMARY_GREEN } from 'resources/constants/colors';
import { IMAGES_URL } from 'resources/constants/urls';
import useTherapist from 'state/therapists';
import styled from 'styled-components';
import NoProfileSVG from 'resources/img/no-pic-therapist.png';
import { Body, SectionTitle } from 'components/Text';
import { useState } from 'react';
import { timeAvailabilityToString } from 'utils/text';
import DateSelection from './components/DateSelection';

const TherapistContainer = styled.header`
    display: flex;
    gap: 10px;
    .image-container {
        width: 100px;
        height: 100px;
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
        gap: 10px;
        .texts {
            color: ${DARKER_TEXT};
            h4 {
                font-size: 16px;
                margin: 0;
                user-select: none;
            }
        }
    }
`;

const Phrase = styled.p`
    color: ${PRIMARY_GREEN};
    font-style: italic;
    font-weight: 500;
    font-size: 12px;
    @media screen and (max-height: 670px) {
        margin-bottom: 0;
    }
`;

const Profile = () => {
    const { therapistId } = useParams();
    const [therapists, therapistsDispatcher] = useTherapist();
    const [availabilityString, setAvailabilityString] = useState(null);

    useEffect(() => {
        therapistsDispatcher.fetchProfileStart(therapistId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if(!therapists.current.timeAvailability) return;
        setAvailabilityString(timeAvailabilityToString(therapists.current.timeAvailability));
    }, [therapists.current.timeAvailability])

    return (
        <MainContainer withSideMenu={false} withBottomNavigation={false}>
            <TopBar />
            {!therapists.fetching.state && therapists.current?.id && (
                <>
                    <TherapistContainer>
                        <div className="image-container">
                            <img
                                src={
                                    therapists.current.profileImg ? `${IMAGES_URL}${therapists.current.profileImg}` : NoProfileSVG
                                }
                                alt={`perfil de ${therapists.current.name} ${therapists.current.lastName}`}
                            />
                        </div>
                        <div className="information">
                            <div className="texts">
                                <h4>{`${therapists.current.title} ${therapists.current.name} ${therapists.current.lastName}`}</h4>
                            </div>
                            <RatingStars
                                reviewsCount={therapists.current.reviews.length}
                                reviewAvg={
                                    therapists.current.reviews?.reduce((acc, curr) => acc + curr.rating, 0) /
                                    therapists.current.reviews.length
                                }
                            />
                        </div>
                    </TherapistContainer>
                    {!!therapists.current.phrase && <Phrase>{therapists.current.phrase}</Phrase>}
                    {!!therapists.current.experience && <SectionTitle>Acerca de</SectionTitle>}
                    {!!therapists.current.experience && <Body>{therapists.current.experience}</Body>}
                    {!!availabilityString && <SectionTitle>Horario</SectionTitle>}
                    {!!availabilityString && <Body>Disponible: {availabilityString.days}</Body>}
                    {!!therapists.current.timeAvailability && <SectionTitle>Calendario</SectionTitle>}
                    {!!therapists.current.timeAvailability && <DateSelection timeAvailability={therapists.current.timeAvailability} />}
                </>
            )}
        </MainContainer>
    );
};

export default Profile;
