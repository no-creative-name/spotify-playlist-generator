import styled from 'styled-components';

export const Button = styled.button`
    margin-top: 15px;
    font-size: 18px;
    border-radius: 5px;
    width: 100%;
    transition: background-color 0.1s;

    &:active {
        background-color: lightgrey;
    }
`;