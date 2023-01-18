import CalendarInput from 'components/Input/CalendarInput';
import EditableInput from 'components/Input/EditableInput';
import EditableTextArea from 'components/Input/EditableTextArea';
import Loading from 'components/Loading';
import TopBar from 'components/TopBar';
import MainContainer from 'containers/MainContainer';
import React, { useEffect } from 'react';
import { useState } from 'react';
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
    const [therapistData, setTherapistData] = useState({
       title: '', 
       experience: '', 
       phrase: '', 
    });

    useEffect(() => {
        userDispatcher.fetchStart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (
            Object.keys(user.user).length > 0 &&
            !user.fetching.fetch.state &&
            !user.fetching.update.state
        ) {
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
    }, [user.user]);

    useEffect(() => {
        if (
            typeof user.user.extraData === 'object' &&
            Object.keys(user.user.extraData).length > 0 &&
            !user.fetching.fetch.state &&
            !user.fetching.update.state
        ) {
            setTherapistData({
                title: user.user.extraData.title, 
                experience: user.user.extraData.experience, 
                phrase: user.user.extraData.phrase, 
            });
        }
    }, [user.user, user.user.extraData]);

    const onChange = (key) => (value) => {
        setUserData({ ...userData, [key]: value });
    };

    const onChangeTherapist = (key) => (value) => {
        setTherapistData({ ...therapistData, [key]: value });
    };

    const onSubmit = (key) => {
        const newValue = userData[key].trim();
        if (user.user[key] !== newValue) {
            userDispatcher.updateStart({ key, value: newValue });
        }
    };

    const onSubmitTherapist = (key) => {
        const newValue = therapistData[key].trim();
        if (user.user.extraData && user.user.extraData[key] !== newValue) {
            userDispatcher.updateTherapistStart({ key, value: newValue });
        }
    };

    const onChangeDate = (value) => {
        setUserData({ ...userData, dob: value });
        if (user.user.dob !== value) {
            userDispatcher.updateStart({ key: 'dob', value });
        }
    };

    const loadingUserData =
        user.fetching.update.state || user.fetching.fetch.state;

    return (
        <MainContainer withSideMenu={false} withBottomNavigation={false}>
            <TopBar title={'Personalizar'} />
            {(loadingUserData &&
                !!user.fetching.update.state.config &&
                Object.keys(user.fetching.update.state.config).length === 0) ||
            Object.keys(user.user).length === 0 ? (
                <Loading />
            ) : (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                    }}
                >
                    <ProfileUpload />
                    <EditableInput
                        inputProps={{
                            value: userData.name,
                            onChange: (e) => onChange('name')(e.target.value),
                        }}
                        labelProps={{ label: 'Nombre(s)' }}
                        loading={
                            user.fetching.update.state &&
                            user.fetching.update.config.key === 'name'
                        }
                        onSubmit={() => onSubmit('name')}
                    />
                    <EditableInput
                        inputProps={{
                            value: userData.lastName,
                            onChange: (e) =>
                                onChange('lastName')(e.target.value),
                        }}
                        labelProps={{ label: 'Apellido(s)' }}
                        loading={
                            user.fetching.update.state &&
                            user.fetching.update.config.key === 'lastName'
                        }
                        onSubmit={() => onSubmit('lastName')}
                    />
                    <CalendarInput
                        inputProps={{
                            value: userData.dob,
                            onChange: (value) => onChangeDate(value),
                        }}
                        labelProps={{ label: 'Fecha de nacimiento' }}
                        loading={
                            user.fetching.update.state &&
                            user.fetching.update.config.key === 'dob'
                        }
                    />
                    {user.user?.userType === 'therapist' && (
                        <>
                            <EditableInput
                                inputProps={{
                                    value: therapistData.title,
                                    onChange: (e) =>
                                        onChangeTherapist('title')(e.target.value),
                                }}
                                labelProps={{ label: 'Título' }}
                                loading={
                                    user.fetching.update.state &&
                                    user.fetching.update.config.key === 'title'
                                }
                                onSubmit={() => onSubmitTherapist('title')}
                            />
                            <EditableTextArea
                                inputProps={{
                                    value: therapistData.phrase,
                                    onChange: (e) =>
                                        onChangeTherapist('phrase')(e.target.value),
                                    rows: 3,
                                }}
                                labelProps={{ label: 'Frase' }}
                                loading={
                                    user.fetching.update.state &&
                                    user.fetching.update.config.key === 'name'
                                }
                                onSubmit={() => onSubmitTherapist('phrase')}
                            />
                            <EditableTextArea
                                inputProps={{
                                    value: therapistData.experience,
                                    onChange: (e) =>
                                        onChangeTherapist('experience')(e.target.value),
                                    rows: 8,
                                }}
                                labelProps={{ label: 'Experiencia' }}
                                loading={
                                    user.fetching.update.state &&
                                    user.fetching.update.config.key === 'name'
                                }
                                onSubmit={() => onSubmitTherapist('experience')}
                            />
                        </>
                    )}
                </div>
            )}
        </MainContainer>
    );
};

export default Profile;
