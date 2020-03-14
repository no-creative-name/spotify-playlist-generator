import React from 'react';
import { Button } from '../basic/Button';
import { Box } from '../basic/Box';

const LoginScreen: React.FC = () => {
    return (
        <Box>
            <h1>Hi there!</h1>
            <h2>Welcome to listify!</h2>
            <p>listify allows you to create Spotify playlists based on different parameters.</p>
            <p>To start, connect listify to your Spotify account:</p>
            <a href="http://localhost:8888/login">
                <Button>Login to Spotify</Button>
            </a>
        </Box>
    )
}

export default LoginScreen;