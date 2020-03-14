import {PlaylistConfigurationParameters } from '../interfaces/PlaylistConfigurationParameters';
import { PlaylistPlan } from '../interfaces/PlaylistPlan';

export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
export const SET_PLAYLIST_CONFIGURATION_PARAMETERS = 'SET_PLAYLIST_CONFIGURATION_PARAMETERS';
export const SET_PLAYLIST_PLAN = 'SET_PLAYLIST_PLAN';

export const setAccessToken = (accessToken: string) => {
    return { type: SET_ACCESS_TOKEN, accessToken};
}
export const setPlaylistConfigurationParameters = (playlistConfigurationParameters: PlaylistConfigurationParameters) => {
    return { type: SET_PLAYLIST_CONFIGURATION_PARAMETERS, playlistConfigurationParameters};
}
export const setPlaylistPlan = (playlistPlan: PlaylistPlan) => {
    return { type: SET_PLAYLIST_PLAN, playlistPlan};
}