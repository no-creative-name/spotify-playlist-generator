import React from 'react';
import { Button } from '../basic/Button';
import { Box } from '../basic/Box';
import { ContentContainer } from '../basic/ContentContainer';

const LoginScreen: React.FC = () => {
    return (
        <Box>
            <h1>Hi there!</h1>
            <h2>Welcome to listify!</h2>
            <ContentContainer>
                <p>listify allows you to create Spotify playlists based on different parameters.</p>
                <p>It browses your "Liked Songs" for the ones that fit your filters.</p>
                <p>To start, connect listify to your Spotify account:</p>
            </ContentContainer>
            <a href="http://schwarzfisch:8888/login">
                <Button>Connect to Spotify</Button>
            </a>
        </Box>
    )
}

export default LoginScreen;