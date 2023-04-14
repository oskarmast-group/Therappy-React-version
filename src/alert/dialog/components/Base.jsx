import React from 'react';
import Modal from 'simple-react-modal';
import styled from 'styled-components';
import CloseSVG from 'resources/img/icons/close-icon.svg';

const CustomModal = styled(Modal)`
    position: fixed;
    inset: 0px;
    background: rgba(0, 0, 0, 0.8);
    z-index: 99999;
    transition: opacity 1s ease-in 0s;
    pointer-events: auto;
    overflow-y: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: inherit;

    .inner {
        width: 90%;
        position: relative;
        margin: 0;
        padding: 0;
        background: #ffffff;
        overflow: visible;
        border-radius: 24px;
        max-width: 486px;
        max-height: 75%;
        display: flex;
        flex-direction: column;
    }

    .innerResponsive {
        width: auto;
        position: relative;
        margin: 0;
        padding: 0;
        background: #ffffff;
        overflow: visible;
        border-radius: 24px;
        height: auto;
        max-width: 95%;
        max-height: 95%;
        display: flex;
        flex-direction: column;
    }
`;
const Content = styled.div`
    padding: 30px 25px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`;

const MainContent = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    margin: 0;
`;

const CloseIcon = styled.button`
    position: absolute;
    right: 10px;
    top: 10px;
    width: 30px;
    height: 30px;
    background-color: transparent;
    z-index: 5;
    padding: 0;
    margin: 0;
    outline: none;
    border: none;
    img {
        width: 100%;
        height: 100%;
    }
`;

const Base = ({ className, open, onClose, children, isResponsive, showCloseButton = true }) => {
    return (
        <CustomModal show={open} className={`${className ?? ''}`} containerClassName={isResponsive ? 'innerResponsive' : 'inner'}>
            {onClose && showCloseButton && (
                <CloseIcon type='button' onClick={onClose}>
                    <img src={CloseSVG} alt="close" />
                </CloseIcon>
            )}
            <Content>
                <MainContent>{children}</MainContent>
            </Content>
        </CustomModal>
    );
};

export default Base;
