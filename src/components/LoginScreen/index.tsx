import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 80vw;
    height: 80vh;
    margin: 0 auto;
    background-color: lightgrey;
`;

const Button = styled.button`
    width: 200px;
    height: 100px;
    font-size: 20px;
`;

const LoginScreen: React.FC = () => {
    return (
        <Container>
            <a href="http://localhost:8888">
                <Button>Login to Spotify</Button>
            </a>
        </Container>
    )
}

export default LoginScreen;