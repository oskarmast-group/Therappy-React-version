import MainContainer from 'containers/MainContainer';
import React, { useEffect } from 'react';
import useUser from 'state/user';
import { Ring } from '@uiball/loaders';
import Clients from './Clients';
import { PRIMARY_GREEN } from 'resources/constants/colors';
import Therapists from './Therapist';
import { UserTypes } from 'resources/constants/config';

const Payments = () => {
    const [user, userDispatcher] = useUser();

    useEffect(() => {
        if (!user.current.id) {
            userDispatcher.fetchStart();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <MainContainer withSideMenu={false} withBottomNavigation={false}>
            {user.fetching.fetch.state ? (
                <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0', alignItems: 'center' }}>
                    <Ring color={PRIMARY_GREEN} size={22} />
                </div>
            ) : (
                <>
                    {user.current.userType === UserTypes.CLIENT && <Clients />}
                    {user.current.userType === UserTypes.THERAPIST && <Therapists />}
                </>
            )}
        </MainContainer>
    );
};

export default Payments;
