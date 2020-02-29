import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { getSpotifyApi } from '../../connectors/SpotifyAPIConnector';
import SpotifyWebApi from "spotify-web-api-js";
import ConfigurationForm, { PlaylistFormData, Button } from './ConfigurationForm';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    width: 80vw;
    height: 100vh;
    margin: 0 auto;
    background-color: lightgrey;
`;

const Error = styled.div`
    color: red;
    margin: 50px 0;
    font-weight: 600;
`

interface ExtendedTrackObject {
    audioFeatures: SpotifyApi.AudioFeaturesResponse;
    track: SpotifyApi.TrackObjectFull;
}

const PlaylistGenerator: React.FC = () => {
    const [spotifyApi, setSpotifyApi] = useState<SpotifyWebApi.SpotifyWebApiJs>(new SpotifyWebApi());
    const [error, setError] = useState('');

    useEffect(() => {
        const accessToken = window.location.hash.substr(1);

        setSpotifyApi(getSpotifyApi(accessToken));
    }, []);

    const onSubmitForm = (formData: PlaylistFormData) => {
        initiatePlaylistGeneration(formData);
    }

    const initiatePlaylistGeneration = async (playlistFormData: PlaylistFormData) => {
        const limitPerFetch = 50;
        const numberOfFetches = playlistFormData.numberOfTracks / limitPerFetch;
        const fetchPromises = [];

        if (spotifyApi) {
            for (let i = 0; i < numberOfFetches; i++) {
                fetchPromises.push(spotifyApi.getMySavedTracks({
                    limit: limitPerFetch,
                    offset: i * limitPerFetch
                }));
            };
            const userTracks = Array<SpotifyApi.SavedTrackObject>();
            await Promise.all(fetchPromises).then(res => {
                res.map(r => userTracks.push(...r.items));
            });
            let tempTrackIds = Array<string>();
            let audioFeaturesPromises = Array<Promise<SpotifyApi.MultipleAudioFeaturesResponse>>();
            userTracks.forEach(
                (t, idx) => {
                    if (idx !== 0 && (idx % 100 === 0 || idx === userTracks.length - 1)) {
                        audioFeaturesPromises.push(getAudioFeaturesForTrackIds(tempTrackIds));
                        tempTrackIds = [];
                    } else {
                        tempTrackIds.push(t.track.id);
                    }
                }
            );
            const extendedTracks = Array<ExtendedTrackObject>();
            await Promise.all(audioFeaturesPromises).then(res => {
                const audioFeatures = Array<SpotifyApi.AudioFeaturesResponse>();
                res.map(audioFeaturesPromiseResult => audioFeatures.push(...audioFeaturesPromiseResult.audio_features));
                audioFeatures.map(audioFeatureTrack => {
                    const correspondingTrack = userTracks.find(t => t.track.id === audioFeatureTrack.id);
                    if (correspondingTrack) {
                        extendedTracks.push({
                            audioFeatures: audioFeatureTrack,
                            track: correspondingTrack.track
                        });
                    }
                })
            });

            const filteredTracks = filterTracks(extendedTracks,
                playlistFormData
            );

            if (filteredTracks.length > 0) {
                setError('');
                await createPlaylist(playlistFormData.playlistName, filteredTracks.map(t => t.track.uri));
            } else {
                setError('Sorry, there are no tracks that fit these conditions. Please try again.');
            }
        }
    }

    const getAudioFeaturesForTrackIds = (trackIds: string[]): Promise<SpotifyApi.MultipleAudioFeaturesResponse> => {
        return spotifyApi.getAudioFeaturesForTracks(trackIds);
    }

    const filterTracks = (
        tracks: ExtendedTrackObject[],
        filters: {
            startYear?: number,
            endYear?: number,
            startBpm?: number,
            endBpm?: number,
            danceability?: number,
            energy?: number,
        }
    ) => tracks.filter(t => {
        const releaseDate = (t.track.album as SpotifyApi.AlbumObjectFull)['release_date'];
        const releaseYear = Number(releaseDate.substr(0, 4));
        const bpm = t.audioFeatures.tempo;
        const danceability = t.audioFeatures.danceability;
        const energy = t.audioFeatures.energy;

        return releaseYear >= (filters.startYear || 0) &&
            releaseYear <= (filters.endYear || 10000) &&
            bpm >= (filters.startBpm || 0) &&
            bpm <= (filters.endBpm || 10000) &&
            danceability >= (filters.danceability || 0.0) &&
            energy >= (filters.energy || 0.0);
    });

    const createPlaylist = async (name: string, trackUris: string[]) => {
        const me = await spotifyApi.getMe();
        const playlistResponse = await spotifyApi.createPlaylist(me.id, {
            name,
        });
        let lastIdx = 0;
        trackUris.forEach((uri, idx) => {
            if (idx !== 0 && (idx % 100 === 0 || idx === trackUris.length - 1)) {
                spotifyApi.addTracksToPlaylist(playlistResponse.id, trackUris.slice(lastIdx, idx));
                lastIdx = idx;
            }
        });
    }

    return (
        <Container>
            <ConfigurationForm onSubmitForm={onSubmitForm} />
            {error ? <Error>{error}</Error> : ''}
        </Container>
    )
}

export default PlaylistGenerator;