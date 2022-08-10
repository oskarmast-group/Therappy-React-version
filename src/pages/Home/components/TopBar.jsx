import React from 'react';
import MenuSVG from 'resources/img/menu.svg';
import NoProfileSVG from 'resources/img/no-profile.svg';
import styled from 'styled-components';

const TopBarComponent = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;

const MenuButton = styled.img`
    cursor: pointer;
`;

const TopBar = () => {
    return (
        <TopBarComponent>
            <MenuButton src={MenuSVG} style={{ marginTop: '10px' }} />
            <img src={NoProfileSVG} />
        </TopBarComponent>
    );
};

export default TopBar;
