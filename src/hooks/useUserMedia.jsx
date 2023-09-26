import { useState, useEffect } from 'react';

const DEFAULT_CAPTURE_OPTIONS = {
    audio: true,
    video: true,
};

export const DEVICES_TYPES = {
    AUDIO_INPUT: 'audioinput',
    AUDIO_OUTPUT: 'audiooutput',
    VIDEO_INPUT: 'videoinput',
};

const DEFAULT_SELECTED_DEVICES = {
    [DEVICES_TYPES.AUDIO_INPUT]: '',
    [DEVICES_TYPES.AUDIO_OUTPUT]: '',
    [DEVICES_TYPES.VIDEO_INPUT]: '',
};

const DEFAULT_DEVICES_LIST = {
    [DEVICES_TYPES.AUDIO_INPUT]: [],
    [DEVICES_TYPES.AUDIO_OUTPUT]: [],
    [DEVICES_TYPES.VIDEO_INPUT]: [],
};

export function useUserMedia() {
    const [options, setOptions] = useState(DEFAULT_CAPTURE_OPTIONS);
    const [mediaStream, setMediaStream] = useState(null);
    const [devices, setDevices] = useState({...DEFAULT_DEVICES_LIST});
    const [selectedDevices, setSelectedDevices] = useState({ ...DEFAULT_SELECTED_DEVICES });
    const [micEnabled, setMicEnabled] = useState(true);
    const [videoEnabled, setVideoEnabled] = useState(true);

    async function initDevices() {
        const devices = await detectDevices();
        if(!devices) return;
        const { audioInputs, audioOutputs, videoInputs } = devices;
        setSelectedDevices({
            [DEVICES_TYPES.AUDIO_INPUT]: audioInputs.length === 0 ? '' : audioInputs[0].deviceId,
            [DEVICES_TYPES.AUDIO_OUTPUT]: audioOutputs.length === 0 ? '' : audioOutputs[0].deviceId,
            [DEVICES_TYPES.VIDEO_INPUT]: videoInputs.length === 0 ? '' : videoInputs[0].deviceId,
        });
    }

    async function detectDevices() {
        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            console.log(devices);

            const audioInputs = filterByType(devices, DEVICES_TYPES.AUDIO_INPUT);
            const audioOutputs = filterByType(devices, DEVICES_TYPES.AUDIO_OUTPUT);
            const videoInputs = filterByType(devices, DEVICES_TYPES.VIDEO_INPUT);

            setDevices({
                [DEVICES_TYPES.AUDIO_INPUT]: audioInputs,
                [DEVICES_TYPES.AUDIO_OUTPUT]: audioOutputs,
                [DEVICES_TYPES.VIDEO_INPUT]: videoInputs,
            });
            
            return { audioInputs, audioOutputs, videoInputs }
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    useEffect(() => {
        initDevices();
    }, []);

    const refreshDevicesList = () => {
        detectDevices();
    }

    useEffect(() => {
        return () => {
            if (!!mediaStream) {
                mediaStream.getTracks().forEach((track) => {
                    track.stop();
                });
            }
        };
    }, [mediaStream]);

    useEffect(() => {
        async function enableStream() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia(options);
                setMediaStream(stream);
            } catch (e) {
                console.error(e);
            }
        }

        enableStream();
    }, [options]);

    const changeSelectedDevice = (type, deviceId) => {
        setSelectedDevices({
            ...selectedDevices,
            [type]: deviceId,
        });
    }

    useEffect(() => {
        const videoId = selectedDevices[DEVICES_TYPES.VIDEO_INPUT];
        const audioId = selectedDevices[DEVICES_TYPES.AUDIO_INPUT];
        setOptions({
            video: { deviceId: videoId ? { exact: videoId } : undefined },
            audio: { deviceId: audioId ? { exact: audioId } : undefined },
        });
    }, [selectedDevices]);

    const toggleMic = () => {
        mediaStream.getAudioTracks().forEach((track) => {
            track.enabled = !micEnabled;
        });
        setMicEnabled(!micEnabled)
    };

    const toggleVideo = () => {
        mediaStream.getVideoTracks().forEach((track) => {
            track.enabled = !videoEnabled;
        });
        setVideoEnabled(!videoEnabled)
    };

    return { mediaStream, devices, selectedDevices, changeSelectedDevice, videoEnabled, toggleVideo, micEnabled, toggleMic };
}

const filterByType = (devices, type) => devices.filter(({ kind }) => kind === type);