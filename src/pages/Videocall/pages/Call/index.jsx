import React, { useEffect, useRef } from 'react';
import { useUserMedia } from 'hooks/useUserMedia';
import useAppointments from 'state/appointments';
import { useParams } from 'react-router';
import { useState } from 'react';
import Preview from './components/Preview';
import VideocallInterface from './components/VideocallInterface';

const Call = () => {
    const [appointments, appointmentsDispatcher] = useAppointments();
    const { roomId } = useParams();
    const [callStarted, setCallStarted] = useState(false);

    useEffect(() => {
        appointmentsDispatcher.fetchOneStart(roomId);
    }, []);

    const {
        mediaStream,
        devices,
        selectedDevices,
        changeSelectedDevice,
        videoEnabled,
        toggleVideo,
        micEnabled,
        toggleMic,
    } = useUserMedia();

    return callStarted ? (
        <VideocallInterface appointments={appointments} localStream={mediaStream} roomId={roomId} toggleMic={toggleMic} toggleVideo={toggleVideo} videoEnabled={videoEnabled} micEnabled={micEnabled} />
    ) : (
        <Preview appointments={appointments} startCall={() => setCallStarted(true)} />
    );
};

export default Call;
