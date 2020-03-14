
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getSpotifyApi } from '../../connectors/SpotifyAPIConnector';
import SpotifyWebApi from "spotify-web-api-js";
import { ExtendedTrackObject } from '../PlaylistGenerator';
import PlaylistPreview from './PlaylistPreview';

const Error = styled.div`
    color: red;
    margin: 50px 0;
    font-weight: 600;
`;

export interface PlaylistPlan {
    name: string;
    trackUris: string[];
    trackInfos: ExtendedTrackObject[];
}

interface ChildComponentProps {
    location: {
        state: {
            playlistPlan: PlaylistPlan;
            accessToken: string;
        }
    };
}

const PlaylistPreviewScreen: React.FC<ChildComponentProps> = ({ location }) => {
    const [spotifyApi, setSpotifyApi] = useState<SpotifyWebApi.SpotifyWebApiJs>(new SpotifyWebApi());
    const [error, setError] = useState('');

    useEffect(() => {
        setSpotifyApi(getSpotifyApi(location.state.accessToken));
    }, []);

    const createPlaylist = async () => {
        const me = await spotifyApi.getMe();
        const playlistResponse = await spotifyApi.createPlaylist(me.id, {
            name: location.state.playlistPlan.name,
        });
        let lastIdx = 0;
        location.state.playlistPlan.trackUris.forEach((uri, idx) => {
            if (idx !== 0 && (idx % 100 === 0 || idx === location.state.playlistPlan.trackUris.length - 1)) {
                spotifyApi.addTracksToPlaylist(playlistResponse.id, location.state.playlistPlan.trackUris.slice(lastIdx, idx));
                lastIdx = idx;
            }
        });
    }

    return (
        <React.Fragment>
            <PlaylistPreview playlistData={location.state.playlistPlan} onPlaylistCreate={createPlaylist}/>
            {error ? <Error>{error}</Error> : ''}
        </React.Fragment>
    )
}

export default PlaylistPreviewScreen;