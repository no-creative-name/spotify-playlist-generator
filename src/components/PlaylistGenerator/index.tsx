import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { getSpotifyApi } from '../../connectors/SpotifyAPIConnector';
import SpotifyWebApi from "spotify-web-api-js";
import ConfigurationForm, { PlaylistFormData } from './ConfigurationForm';
import { LoadingSpinner } from '../basic/LoadingSpinner';
import { useHistory } from "react-router-dom";

const Error = styled.div`
    color: red;
    margin: 50px 0;
    font-weight: 600;
`

export interface ExtendedTrackObject {
    audioFeatures: SpotifyApi.AudioFeaturesResponse;
    track: SpotifyApi.TrackObjectFull;
}

export interface PlaylistPlan {
    name: string;
    trackUris: string[];
    trackInfos: ExtendedTrackObject[];
}

const PlaylistGenerator: React.FC = () => {
    const [spotifyApi, setSpotifyApi] = useState<SpotifyWebApi.SpotifyWebApiJs>(new SpotifyWebApi());
    const [error, setError] = useState('');
    const [playlistPlan, setPlaylistPlan] = useState<PlaylistPlan>({
        name: '',
        trackUris: [],
        trackInfos: [],
    });
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const accessToken = window.location.hash.substr(1);

        setSpotifyApi(getSpotifyApi(accessToken));
    }, []);

    const getFilteredTracks = async (playlistFormData: PlaylistFormData) => {
        setLoading(true);
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
                setPlaylistPlan({
                    name: playlistFormData.playlistName,
                    trackInfos: filteredTracks,
                    trackUris: filteredTracks.map(t => t.track.uri)
                });
                
                history.push({
                    pathname: `/preview`,
                    state: {
                        playlistPlan: {
                            name: playlistFormData.playlistName,
                            trackInfos: filteredTracks,
                            trackUris: filteredTracks.map(t => t.track.uri)
                        },
                        accessToken: window.location.hash.substr(1)
                    }
                });
                
            } else {
                setLoading(false);
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
        const bpm = t.audioFeatures.tempo > 200 ? t.audioFeatures.tempo / 2 : t.audioFeatures.tempo;
        const danceability = t.audioFeatures.danceability;
        const energy = t.audioFeatures.energy;

        return releaseYear >= (filters.startYear || 0) &&
            releaseYear <= (filters.endYear || 10000) &&
            bpm >= (filters.startBpm || 0) &&
            bpm <= (filters.endBpm || 10000) &&
            danceability >= (filters.danceability || 0.0) &&
            energy >= (filters.energy || 0.0);
    });

    return (
        <React.Fragment>
            {
                loading ? (<LoadingSpinner></LoadingSpinner>) : (<ConfigurationForm onSubmitForm={getFilteredTracks} />)
            }
            {error ? <Error>{error}</Error> : ''}
        </React.Fragment>
    )
}

export default PlaylistGenerator;