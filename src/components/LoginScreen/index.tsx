import React from 'react';
import { Button } from '../basic/Button';
import { CenterBox } from '../basic/CenterBox';

const LoginScreen: React.FC = () => {
    return (
        <CenterBox>
            <h1>Hi there!</h1>
            <h2>Welcome to listify!</h2>
            <p>listify allows you to create Spotify playlists based on different parameters.</p>
            <p>To start, connect listify to your Spotify account:</p>
            <a href="http://localhost:8888/login">
                <Button>Login to Spotify</Button>
            </a>
        </CenterBox>
    )
}

export default LoginScreen;