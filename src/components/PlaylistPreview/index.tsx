
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getSpotifyApi } from '../../connectors/SpotifyAPIConnector';
import SpotifyWebApi from "spotify-web-api-js";
import { ExtendedTrackObject } from '../../interfaces/ExtendedTrackObject';
import PlaylistPreview from './PlaylistPreview';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../interfaces/RootState';
import { setPlaylistId } from '../../actions';

export interface PlaylistPlan {
    name: string;
    trackUris: string[];
    trackInfos: ExtendedTrackObject[];
}

const PlaylistPreviewScreen: React.FC = () => {
    const playlistPlan = useSelector<RootState, PlaylistPlan>(state => state.playlistPlan);
    const accessToken = useSelector<RootState, string>(state => state.accessToken);
    const dispatch = useDispatch();
    const [spotifyApi, setSpotifyApi] = useState<SpotifyWebApi.SpotifyWebApiJs>(new SpotifyWebApi());

    useEffect(() => {
        setSpotifyApi(getSpotifyApi(accessToken));
    }, []);

    const createPlaylist = async () => {
        const me = await spotifyApi.getMe();
        const playlistResponse = await spotifyApi.createPlaylist(me.id, {
            name: playlistPlan.name,
        });
        dispatch(setPlaylistId(playlistResponse.id));
        let lastIdx = 0;
        playlistPlan.trackUris.forEach((uri, idx) => {
            if (idx !== 0 && (idx % 100 === 0 || idx === playlistPlan.trackUris.length - 1)) {
                spotifyApi.addTracksToPlaylist(playlistResponse.id, playlistPlan.trackUris.slice(lastIdx, idx));
                lastIdx = idx;
            }
        });
    }

    return (
        <React.Fragment>
            <PlaylistPreview playlistData={playlistPlan} onPlaylistCreate={createPlaylist}/>
        </React.Fragment>
    )
}

export default PlaylistPreviewScreen;