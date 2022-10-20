import { Ring } from '@uiball/loaders';
import Input from 'components/Input';
import CalendarInput from 'components/Input/CalendarInput';
import EditableInput from 'components/Input/EditableInput';
import TopBar from 'components/TopBar';
import MainContainer from 'containers/MainContainer';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { PRIMARY_GREEN } from 'resources/constants/colors';
import useUser from 'state/user';
import ProfileUpload from './components/ProfileUpload';

const Profile = () => {
    const [user, userDispatcher] = useUser();
    const [userData, setUserData] = useState({
        name: '',
        lastName: '',
        email: '',
        dob: '',
        phoneNumber: '',
        phoneCountryCode: '',
        countryOrigin: '',
    });

    useEffect(() => {
        userDispatcher.fetchStart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (Object.keys(user.user).length > 0 && !user.fetching.state) {
            setUserData({
                name: user.user.name,
                lastName: user.user.lastName,
                email: user.user.email,
                dob: user.user.dob,
                phoneNumber: user.user.phoneNumber,
                phoneCountryCode: user.user.phoneCountryCode,
                countryOrigin: user.user.countryOrigin,
            });
        }
    }, [user.user, user.fetching.state]);

    const onChange = (key) => (value) => {
        setUserData({ ...userData, [key]: value });
    };

    const onSubmit = (key) => {
        const newValue = userData[key].trim();
        if(user.user[key] !== newValue) {
            userDispatcher.updateStart({key, value: newValue});
        }
    }

    const onChangeDate = (value) => {
        setUserData({ ...userData, dob: value });
        if(user.user.dob !== value) {
            userDispatcher.updateStart({key: 'dob', value });
        }
    }

    return (
        <MainContainer withSideMenu={false} withBottomNavigation={false}>
            <TopBar title={'Personalizar'} />
            {(user.fetching.state && !!user.fetching.state.config && Object.keys(user.fetching.state.config).length === 0) ||
            Object.keys(user.user).length === 0 ? (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Ring color={PRIMARY_GREEN} size={50} />
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <ProfileUpload />
                    <EditableInput
                        inputProps={{ value: userData.name, onChange: (e) => onChange('name')(e.target.value) }}
                        labelProps={{ label: 'Nombre(s)' }}
                        loading={user.fetching.state && user.fetching.config.key === 'name'}
                        onSubmit={()=>onSubmit('name')}
                    />
                    <EditableInput
                        inputProps={{ value: userData.lastName, onChange: (e) => onChange('lastName')(e.target.value) }}
                        labelProps={{ label: 'Apellido(s)' }}
                        loading={user.fetching.state && user.fetching.config.key === 'lastName'}
                        onSubmit={()=>onSubmit('lastName')}
                    />
                    <CalendarInput
                        inputProps={{ value: userData.dob, onChange: (value) => onChangeDate(value) }}
                        labelProps={{ label: 'Fecha de nacimiento' }}
                        loading={user.fetching.state && user.fetching.config.key === 'dob'}
                    />
                </div>
            )}
        </MainContainer>
    );
};

export default Profile;
