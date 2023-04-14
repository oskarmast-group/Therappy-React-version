import { Ring } from '@uiball/loaders';
import React from 'react';
import { PRIMARY_GREEN } from 'resources/constants/colors';

const Loading = ({ position = 'center', size = 50, color = PRIMARY_GREEN }) => {
    return (
        <div style={{ display: 'flex', justifyContent: position }}>
            <Ring color={color} size={size} />
        </div>
    );
};

export default Loading;
