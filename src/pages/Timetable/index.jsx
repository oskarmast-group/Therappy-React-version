import Loading from 'components/Loading';
import TopBar from 'components/TopBar';
import MainContainer from 'containers/MainContainer';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import useUser from 'state/user';
import styled from 'styled-components';
import HoursPicker from './components/HoursPicker';
import { GREEN, PRIMARY_GREEN } from 'resources/constants/colors';
import { Ring } from '@uiball/loaders';
import Scrollable from 'containers/Scrollable';

const UpdateButton = styled.button`
    padding: 3px 10px;
    background-color: ${PRIMARY_GREEN};
    font-size: 12px;
    color: white;
    border: none;
    outline: none;
    border-radius: 20px;
    height: fit-content;
    align-self: center;
    width: fit-content;
`;

const Timetable = () => {
    const [hoursChanged, setHoursChanged] = useState(false);
    const [user, userDispatcher] = useUser();
    const [timeAvailability, setTimeAvailability] = useState({
        hours: {},
        specialDates: {},
    });
    const history = useHistory();

    useEffect(() => {
        userDispatcher.fetchStart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!user.user.userType) return;
        if (user.user.userType !== 'therapist') history.push('/');
    }, [user.user]);

    useEffect(() => {
        if (Object.keys(user.user).length > 0 && !user.fetching.fetch.state) {
            setTimeAvailability({
                hours: user.user.extraData?.timeAvailability?.hours ?? {},
                specialDates:
                    user.user.extraData?.timeAvailability?.specialDates ?? {},
            });
        }
    }, [user.user, user.fetching.fetch.state]);

    const updateHours = (hours) => {
        setTimeAvailability({ ...timeAvailability, hours });
    };

    useEffect(() => {
        let changed = false;
        const hours = timeAvailability.hours;
        const userHours = user.user.extraData?.timeAvailability?.hours;
        for (const day of Object.keys(hours)) {
            if (changed === true) break;
            const dayHours = hours[day];
            const userDayHours = userHours[day];
            if (dayHours === null && userDayHours === null) continue;
            if (dayHours === null || userDayHours === null) {
                changed = true;
                break;
            }
            if (dayHours.length !== userDayHours.length) {
                changed = true;
                break;
            }
            for (let i = 0; i < dayHours.length; i++) {
                const start = dayHours[i][0];
                const end = dayHours[i][1];
                const userStart = userDayHours[i][0];
                const userEnd = userDayHours[i][1];

                if (start !== userStart) {
                    changed = true;
                    break;
                }
                if (end !== userEnd) {
                    changed = true;
                    break;
                }
            }
        }
        setHoursChanged(changed);
    }, [timeAvailability]);

    const onSubmitHours = () => {
        userDispatcher.updateTherapistStart({
            key: 'timeAvailability',
            value: timeAvailability,
        });
    };

    return (
        <MainContainer withSideMenu={false} withBottomNavigation={false}>
            <TopBar title={'Horario'} />
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <h3>Horario regular</h3>
                {hoursChanged && (
                    <UpdateButton type="button" onClick={onSubmitHours}>
                        Actualizar
                    </UpdateButton>
                )}
                {user.fetching.update?.config?.key === 'timeAvailability' && (
                    <Ring color={GREEN} size={25} />
                )}
            </div>
            <Scrollable>
                {(user.fetching.fetch.state &&
                    !!user.fetching.fetch.config &&
                    Object.keys(user.fetching.fetch.config).length === 0) ||
                Object.keys(user.user).length === 0 ? (
                    <Loading />
                ) : (
                    <>
                        <HoursPicker
                            hours={timeAvailability.hours}
                            onChange={updateHours}
                        />
                    </>
                )}
            </Scrollable>
        </MainContainer>
    );
};

export default Timetable;
