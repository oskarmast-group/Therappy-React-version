import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './state/store';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './resources/history';
import SocketProvider from 'Socket';

ReactDOM.render(
    <React.Fragment>
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <SocketProvider>
                    <App />
                </SocketProvider>
            </ConnectedRouter>
        </Provider>
    </React.Fragment>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
