import styled from 'styled-components';

export const Button = styled.button`
    width: 100%;
    padding: 10px 20px;
    margin-top: 15px;
    font-size: 18px;
    font-weight: 500;
    border-radius: 5px;
    transition: background-color 0.1s;

    &:active {
        background-color: lightgrey;
    }
`;

export const SmallButton = styled.button`
    width: 100%;
    padding: 8px 15px;
    margin-top: 15px;
    font-size: 16px;
    font-weight: 500;
    border-radius: 5px;
    transition: background-color 0.1s;

    &:active {
        background-color: lightgrey;
    }
`;