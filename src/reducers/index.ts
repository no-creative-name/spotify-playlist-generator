import { SET_ACCESS_TOKEN, SET_PLAYLIST_CONFIGURATION_PARAMETERS, SET_PLAYLIST_PLAN } from '../actions';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History as ExtendedHistory } from 'history';

export const accessToken = (state = '', action: any) => {
    switch (action.type) {
        case SET_ACCESS_TOKEN:
            return action.accessToken;
        default:
            return state;
    }
}

export const playlistConfigurationParameters = (state = {}, action: any) => {
    switch (action.type) {
        case SET_PLAYLIST_CONFIGURATION_PARAMETERS:
            return action.playlistConfigurationParameters;
        default:
            return state;
    }
}

export const playlistPlan = (state = {}, action: any) => {
    switch (action.type) {
        case SET_PLAYLIST_PLAN:
            return action.playlistPlan;
        default:
            return state;
    }
}

const createRootReducer = (history: ExtendedHistory) => combineReducers({ router: connectRouter(history), accessToken, playlistConfigurationParameters, playlistPlan });

export default createRootReducer;