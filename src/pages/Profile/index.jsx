import TopBar from 'components/TopBar';
import MainContainer from 'containers/MainContainer';
import React, { useEffect } from 'react';
import useUser from 'state/user';
import ProfileUpload from './components/ProfileUpload';

const Profile = () => {
    const [user, userDispatcher] = useUser();

    useEffect(() => {
        userDispatcher.fetchStart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    

    return (
        <MainContainer withSideMenu={false} withBottomNavigation={false}>
            <TopBar title={'Personalizar'} />
            <ProfileUpload />
        </MainContainer>
    );
};

export default Profile;
