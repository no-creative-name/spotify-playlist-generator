import React from 'react';
import styled from 'styled-components';
import { Button } from '../Button';

const Container = styled.div`
    width: 80vw;
    height: 80vh;
    padding: 20px;
    border-radius: 5px;
    background-color: lightgreen;
    margin: 20px auto 0 auto;
    font-family: Helvetica;
`;

const LoginScreen: React.FC = () => {
    return (
        <Container>
            <a href="http://localhost:8888/login">
                <Button>Login to Spotify</Button>
            </a>
        </Container>
    )
}

export default LoginScreen;