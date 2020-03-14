export interface PlaylistParameters {
    playlistName: string;
    startYear?: number;
    endYear?: number;
    startBpm?: number;
    endBpm?: number;
    danceability?: number;
    energy?: number;
    valence?: number;
    numberOfTracks: number;
}