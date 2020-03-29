import React, { useEffect } from 'react';
import { Button } from '../basic/Button';
import { Box } from '../basic/Box';
import { ContentContainer } from '../basic/ContentContainer';
import { useDispatch } from 'react-redux';
import { setAccessToken } from '../../actions';
import { useHistory } from 'react-router-dom';

const LoginScreen: React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const searchParams = new URLSearchParams(new URL(window.location.href).search.slice(1));
        const code = searchParams.get('code');
        
        if(code !== null) {
            fetch(`https://ekztlsf157.execute-api.eu-west-1.amazonaws.com/prod/get-tokens?code=${code}`)
                .then(res => res.json())
                .then(json => json.done.json['access_token'])
                .then(token => {
                    dispatch(setAccessToken(token));
                    history.push('/generate');
                })
                .catch(e => console.error(e));
        }
    }, [])
    
    const authenticateSpotifyAPI = async () => {
        fetch('https://ekztlsf157.execute-api.eu-west-1.amazonaws.com/prod/authenticate')
            .then(res => res.json())
            .then(json => JSON.parse(json.body).done['redirect_uri'])
            .then(uri => {
                window.location.href = uri;
            })
            .catch(e => console.error(e));
    }

    return (
        <Box>
            <h1>Hi there!</h1>
            <h2>Welcome to listify!</h2>
            <ContentContainer>
                <p>listify allows you to create Spotify playlists based on different parameters.</p>
                <p>It browses your "Liked Songs" for the ones that fit your filters.</p>
                <p>To start, connect listify to your Spotify account:</p>
            </ContentContainer>
            <Button onClick={() => authenticateSpotifyAPI()}>authenticate</Button>
        </Box>
    )
}

export default LoginScreen;