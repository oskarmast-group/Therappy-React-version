import { useEffect, useState } from 'react';
import { getToken } from 'resources/api/auth';
import { API } from 'resources/constants/urls';
import socket, { useSocket } from 'Socket';
import Webrtc from './webrtc';

const pcConfig = {
    iceServers: [
        {
            urls: [
                'stun:stun.l.google.com:19302',
                'stun:stun1.l.google.com:19302',
                'stun:stun2.l.google.com:19302',
                'stun:stun3.l.google.com:19302',
                'stun:stun4.l.google.com:19302',
            ],
        },
        {
            urls: 'turn:numb.viagenie.ca',
            credential: 'muazkh',
            username: 'webrtc@live.com',
        },
        {
            urls: 'turn:numb.viagenie.ca',
            credential: 'muazkh',
            username: 'webrtc@live.com',
        },
        {
            urls: 'turn:192.158.29.39:3478?transport=udp',
            credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
            username: '28224511:1379330808',
        },
    ],
};

export const useStreamingSocket = (roomId, localStream) => {
    const [remoteStream, setRemoteStream] = useState(null);
    const [webrtc, setWebrtc] = useState(null);
    const socket = useSocket();

    useEffect(() => {       
        if(!socket) return;

        const webrtc = new Webrtc(socket, localStream, pcConfig, {
            log: true,
            warn: true,
            error: true,
        });
        
        webrtc.addEventListener('createdRoom', () => {
            webrtc.gotStream();
        });

        webrtc.addEventListener('joinedRoom', () => {
            webrtc.gotStream();
        });

        webrtc.addEventListener('newUser', (e) => {
            const stream = e.detail.stream;

            setRemoteStream(stream);
        });

        webrtc.addEventListener('removeUser', (e) => {
            setRemoteStream(null);
        });
        setWebrtc(webrtc);
    }, [socket]);

    useEffect(() => {
        if (!socket || !localStream || !webrtc) return;
        webrtc.joinRoom('create or join', roomId);
    }, [socket, webrtc, localStream]);

    const leaveCall = () => {
        socket.emit('leave room', this.room);
    }

    return { leaveCall, remoteStream };
};
