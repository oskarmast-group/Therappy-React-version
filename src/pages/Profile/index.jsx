import CalendarInput from 'components/Input/CalendarInput';
import EditableInput from 'components/Input/EditableInput';
import EditableTextArea from 'components/Input/EditableTextArea';
import Loading from 'components/Loading';
import TopBar from 'components/TopBar';
import MainContainer from 'containers/MainContainer';
import Scrollable from 'containers/Scrollable';
import React, { useEffect } from 'react';
import { useState } from 'react';
import useUser from 'state/user';
import ProfileUpload from './components/ProfileUpload';
import { UserTypes } from 'resources/constants/config';

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
            Object.keys(user.current).length > 0 &&
            !user.fetching.fetch.state &&
            !user.fetching.update.state
        ) {
            setUserData({
                name: user.current.name,
                lastName: user.current.lastName,
                email: user.current.email,
                dob: user.current.dob,
                phoneNumber: user.current.phoneNumber,
                phoneCountryCode: user.current.phoneCountryCode,
                countryOrigin: user.current.countryOrigin,
            });
        }
    }, [user.current]);

    useEffect(() => {
        if (
            typeof user.current.extraData === 'object' &&
            Object.keys(user.current.extraData).length > 0 &&
            !user.fetching.fetch.state &&
            !user.fetching.update.state
        ) {
            setTherapistData({
                title: user.current.extraData.title,
                experience: user.current.extraData.experience,
                phrase: user.current.extraData.phrase,
            });
        }
    }, [user.current, user.current.extraData]);

    const onChange = (key) => (value) => {
        setUserData({ ...userData, [key]: value });
    };

    const onChangeTherapist = (key) => (value) => {
        setTherapistData({ ...therapistData, [key]: value });
    };

    const onSubmit = (key) => {
        const newValue = userData[key].trim();
        if (user.current[key] !== newValue) {
            userDispatcher.updateStart({ key, value: newValue });
        }
    };

    const onSubmitTherapist = (key) => {
        const newValue = therapistData[key].trim();
        if (user.current.extraData && user.current.extraData[key] !== newValue) {
            userDispatcher.updateTherapistStart({ key, value: newValue });
        }
    };

    const onChangeDate = (value) => {
        setUserData({ ...userData, dob: value });
        if (user.current.dob !== value) {
            userDispatcher.updateStart({ key: 'dob', value });
        }
    };

    const loadingUserData =
        user.fetching.update.state || user.fetching.fetch.state;

    return (
        <MainContainer withSideMenu={false} withBottomNavigation={false}>
            <TopBar title={'Personalizar'} />
            <Scrollable>
                {(loadingUserData &&
                    !!user.fetching.update.state.config &&
                    Object.keys(user.fetching.update.state.config).length ===
                        0) ||
                Object.keys(user.current).length === 0 ? (
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
                                onChange: (e) =>
                                    onChange('name')(e.target.value),
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
                        {user.current?.userType === UserTypes.THERAPIST && (
                            <>
                                <EditableInput
                                    inputProps={{
                                        value: therapistData.title,
                                        onChange: (e) =>
                                            onChangeTherapist('title')(
                                                e.target.value
                                            ),
                                    }}
                                    labelProps={{ label: 'Título' }}
                                    loading={
                                        user.fetching.update.state &&
                                        user.fetching.update.config.key ===
                                            'title'
                                    }
                                    onSubmit={() => onSubmitTherapist('title')}
                                />
                                <EditableTextArea
                                    inputProps={{
                                        value: therapistData.phrase,
                                        onChange: (e) =>
                                            onChangeTherapist('phrase')(
                                                e.target.value
                                            ),
                                        rows: 3,
                                    }}
                                    labelProps={{ label: 'Frase' }}
                                    loading={
                                        user.fetching.update.state &&
                                        user.fetching.update.config.key ===
                                            'phrase'
                                    }
                                    onSubmit={() => onSubmitTherapist('phrase')}
                                />
                                <EditableTextArea
                                    inputProps={{
                                        value: therapistData.experience,
                                        onChange: (e) =>
                                            onChangeTherapist('experience')(
                                                e.target.value
                                            ),
                                        rows: 8,
                                    }}
                                    labelProps={{ label: 'Experiencia' }}
                                    loading={
                                        user.fetching.update.state &&
                                        user.fetching.update.config.key ===
                                            'experience'
                                    }
                                    onSubmit={() =>
                                        onSubmitTherapist('experience')
                                    }
                                />
                            </>
                        )}
                    </div>
                )}
            </Scrollable>
        </MainContainer>
    );
};

export default Profile;
