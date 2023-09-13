import styled from 'styled-components';
import { DARKER_TEXT, PLACEHOLDER_TEXT } from 'resources/constants/colors';

export const upLabel = `
    position: absolute;
    top: -20px;
    font-size: 0.75rem;
`;

export const ContainerStyles = `
    width: 100%;
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
    padding: 5px 10px;
    border: 1px solid #687711;
    border-radius: 30px;
    position: relative;
`;

export const IconContainerStyles = `
    width: 25px;
    margin: 0;
    min-height: 25px;
    display: flex;
`;

export const IconStyles = `
    width: 100%;
    height: 100%;
    justify-self: center;
`;

export const LabelContainerStyles = `
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    position: absolute;
    padding: 5px 10px;
    pointer-events: none;
`;

export const LabelStyles = `
    position: absolute;
    top: 10px;
    transition-duration: 0.2s;
    font-size: 0.875rem;
    font-weight: 500;
`;

export const BasicInput = styled.input`
    border: none;
    outline: none;
    width: 100%;
    color: ${DARKER_TEXT};
    background-color: transparent;
    &:disabled {
        color: ${DARKER_TEXT};
    }
    &::placeholder {
        opacity: 1;
        color: ${PLACEHOLDER_TEXT};
    }
    flex-grow: 1;
    margin-right: 10px;
`;

const Container = styled.div`
    ${ContainerStyles}
    ${({ withLabel }) => (withLabel ? 'margin-top: 20px;' : '')}
    .img-container {
        ${IconContainerStyles}
        img {
            ${IconStyles}
        }
    }
    .input-container {
        flex: 1;
        position: relative;
        input {
            border: none;
            outline: none;
            width: 100%;
            color: ${DARKER_TEXT};
            background-color: transparent;
            &:disabled {
                color: ${DARKER_TEXT};
            }
            &::placeholder {
                opacity: 1;
                color: #484848;
            }
            flex-grow: 1;
            margin-right: 10px;
        }
        textarea {
            border: none;
            outline: none;
            width: 100%;
            color: ${DARKER_TEXT};
            background-color: transparent;
            resize: vertical;
            &:disabled {
                color: ${DARKER_TEXT};
            }
            &::placeholder {
                opacity: 1;
                color: #484848;
            }
            flex-grow: 1;
            margin-right: 10px;
        }
        &:hover + .label-container,
        &:focus-within + .label-container {
            label {
                ${upLabel}
            }
        }
    }
    .label-container {
        ${LabelContainerStyles}
        label {
            ${LabelStyles}
            &.up {
                ${upLabel}
            }
        }
    }
`;

export default Container;
