import SpotifyWebApi from "spotify-web-api-js";

export const getSpotifyApi = (accessToken: string): SpotifyWebApi.SpotifyWebApiJs => {
    const api = new SpotifyWebApi();
    api.setAccessToken(accessToken);
    
    return api;
}