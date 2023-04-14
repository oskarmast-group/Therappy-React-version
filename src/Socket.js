import { getToken } from 'resources/api/auth';
import { API } from 'resources/constants/urls';
import socketIOClient from 'socket.io-client';
import React, { useState, useEffect } from 'react';

const SocketProviderContext = React.createContext();

const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socket = socketIOClient(API, { auth: { token: getToken() } });
        setSocket(socket);

        return function cleanup() {
            socket.disconnect();
        };
    }, []);

    return (
        <SocketProviderContext.Provider value={socket}>
            {children}
        </SocketProviderContext.Provider>
    );
};

export const useSocket = () => React.useContext(SocketProviderContext);

export default SocketProvider;
