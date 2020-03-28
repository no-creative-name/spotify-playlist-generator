export interface PlaylistConfigurationParameters {
    playlistName: string;
    yearToggle: boolean;
    startYear: number;
    endYear: number;
    bpmToggle: boolean;
    startBpm: number;
    endBpm: number;
    danceabilityToggle: boolean;
    danceability: number[];
    energyToggle: boolean;
    energy: number[];
    valenceToggle: boolean;
    valence: number[];
    numberOfTracks: number;
}