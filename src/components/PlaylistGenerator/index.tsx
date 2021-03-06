import React, { useState, useEffect } from 'react';
import { getSpotifyApi } from '../../connectors/SpotifyAPIConnector';
import SpotifyWebApi from "spotify-web-api-js";
import ConfigurationForm from './ConfigurationForm';
import { LoadingSpinner } from '../basic/LoadingSpinner';
import { Popup } from '../basic/Popup';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setPlaylistPlan, setAccessToken } from '../../actions/index';
import { PlaylistParameters } from '../../interfaces/PlaylistParameters';
import { RootState } from '../../interfaces/RootState';
import { ExtendedTrackObject } from '../../interfaces/ExtendedTrackObject';

const PlaylistGenerator: React.FC = () => {
    const accessToken = useSelector<RootState, string>(state => state.accessToken);
    const dispatch = useDispatch();
    const [spotifyApi, setSpotifyApi] = useState<SpotifyWebApi.SpotifyWebApiJs>(new SpotifyWebApi());
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if(!accessToken) {
            history.push('login');
        } else {
            setSpotifyApi(getSpotifyApi(accessToken));
        }
    }, []);

    const getFilteredTracks = async (playlistFormData: PlaylistParameters) => {
        setLoading(true);
        const limitPerFetch = 50;
        const numberOfFetches = playlistFormData.numberOfTracks / limitPerFetch;
        const fetchPromises = [];

        if (spotifyApi) {
            const enoughTracks = await spotifyApi.getMySavedTracks({
                limit: limitPerFetch,
                offset: (numberOfFetches - 1) * limitPerFetch
            }).then(res => true).catch(e => {});

            if (enoughTracks) {
                setError('');
                for (let i = 0; i < numberOfFetches; i++) {
                    fetchPromises.push(spotifyApi.getMySavedTracks({
                        limit: limitPerFetch,
                        offset: i * limitPerFetch
                    }).catch(e => { }));
                };
                const userTracks = Array<SpotifyApi.SavedTrackObject>();
                await Promise.all(fetchPromises).then(res => {
                    res.map(r => r ? userTracks.push(...r.items) : null);
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
                    dispatch(setPlaylistPlan({
                        name: playlistFormData.playlistName,
                        trackInfos: filteredTracks,
                        trackUris: filteredTracks.map(t => t.track.uri)
                    }));
                    history.push('/preview');

                } else {
                    setLoading(false);
                    setError('Sorry, there are no tracks that fit these conditions. Please try again.');
                }
            } else {
                setLoading(false);
                setError(`You don't seem to have ${playlistFormData.numberOfTracks} tracks in your library. Please lower the number of tracks to consider.`)
            }
        }
    }

    const getAudioFeaturesForTrackIds = (trackIds: string[]): Promise<SpotifyApi.MultipleAudioFeaturesResponse> => {
        return spotifyApi.getAudioFeaturesForTracks(trackIds);
    }

    const filterTracks = (
        tracks: ExtendedTrackObject[],
        filters: PlaylistParameters
    ) => tracks.filter(t => {
        const releaseDate = (t.track.album as SpotifyApi.AlbumObjectFull)['release_date'];
        const releaseYear = Number(releaseDate.substr(0, 4));
        const bpm = t.audioFeatures.tempo > 200 ? t.audioFeatures.tempo / 2 : t.audioFeatures.tempo;
        const danceability = t.audioFeatures.danceability;
        const energy = t.audioFeatures.energy;
        const valence = t.audioFeatures.valence;

        return releaseYear >= (filters.startYear || 0) &&
            releaseYear <= (filters.endYear || 10000) &&
            bpm >= (filters.startBpm || 0) &&
            bpm <= (filters.endBpm || 10000) &&
            danceability >= (filters.danceability ? filters.danceability[0] : 0.0) &&
            danceability <= (filters.danceability ? filters.danceability[1] : 1.0) &&
            energy >= (filters.energy ? filters.energy[0] : 0.0) &&
            energy <= (filters.energy ? filters.energy[0] : 1.0) &&
            valence >= (filters.valence ? filters.valence[0] : 0.0) &&
            valence <= (filters.valence ? filters.valence[1] : 1.0)
    });

    return (
        <React.Fragment>
            {
                loading ? (<LoadingSpinner></LoadingSpinner>) : (<ConfigurationForm onSubmitForm={getFilteredTracks} />)
            }
            {error ? <Popup onClose={() => setError('')}>{error}</Popup> : ''}
        </React.Fragment>
    )
}

export default PlaylistGenerator;