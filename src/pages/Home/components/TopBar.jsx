import React from 'react';
import { GREEN } from 'resources/constants/colors';
import MenuSVG from 'resources/img/menu.svg';
import NoProfileSVG from 'resources/img/no-profile.svg';
import useUser from 'state/user';
import styled from 'styled-components';

const TopBarComponent = styled.div`
    width: 100%;
    height: 56px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;

const MenuButton = styled.img`
    cursor: pointer;
`;

const ProfileContainer = styled.div`
    width: 56px;
    height: 56px;
    border-radius: 28px;
    overflow: hidden;
    border: 2px solid ${GREEN};
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const TopBar = ({ toggleMenu }) => {
    const [user] = useUser();

    return (
        <TopBarComponent>
            <MenuButton src={MenuSVG} onClick={toggleMenu} style={{ marginTop: '10px' }} alt={'Menu'} />
            <ProfileContainer>
                <img src={user?.user?.profileImg ? `${process.env.PUBLIC_URL}/images/${user.user.profileImg}` : NoProfileSVG} alt={'Imagen de perfil'} />
            </ProfileContainer>
        </TopBarComponent>
    );
};

export default TopBar;
