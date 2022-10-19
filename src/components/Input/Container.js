import styled from 'styled-components';

const upLabel = `
    position: absolute;
    top: -20px;
    font-size: 0.75rem;
`;

const Container = styled.div`
    width: 100%;
    display: flex;
    height: 40px;
    gap: 10px;
    justify-content: center;
    align-items: center;
    padding: 5px 10px;
    ${({ withLabel }) => withLabel ? 'margin-top: 20px;' : ''}
    border: 1px solid #687711;
    border-radius: 30px;
    position: relative;
    .img-container {
        width: 30px;
        height: 100%;
        display: flex;
        img {
            width: 100%;
            height: 100%;
            justify-self: center;
        }
    }
    .input-container {
        flex: 1;
        position: relative;
        input {
            border: none;
            outline: none;
            width: 100%;
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
        height: 100%;
        width: 100%;
        position: absolute;
        padding: 5px 10px;
        pointer-events: none;
        label {
            position: absolute;
            top: 10px;
            transition-duration: 0.2s;
            font-size: 0.875rem;
            font-weight: 500;

            &.up {
                ${upLabel}
            }
        }
    }
`;

export default Container;