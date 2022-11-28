import Loading from 'components/Loading';
import TopBar from 'components/TopBar';
import MainContainer from 'containers/MainContainer';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import useUser from 'state/user';
import HoursPicker from './components/HoursPicker';

const Timetable = () => {
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
                specialDates: user.user.extraData?.timeAvailability?.specialDates ?? {},
            });
        }
    }, [user.user, user.fetching.fetch.state]);

    return (
        <MainContainer withSideMenu={false} withBottomNavigation={false}>
            <TopBar title={'Horario'} />
            {(user.fetching.fetch.state && !!user.fetching.fetch.state.config && Object.keys(user.fetching.fetch.state.config).length === 0) ||
            Object.keys(user.user).length === 0 ? (
                <Loading />
            ) : (
                <>
                    <HoursPicker hours={timeAvailability.hours} onChange={() => {}} />
                </>
            )}
        </MainContainer>
    );
};

export default Timetable;
