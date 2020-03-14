import { PlaylistConfigurationParameters } from "./PlaylistConfigurationParameters";
import { PlaylistPlan } from "./PlaylistPlan";

export interface RootState {
    accessToken: string;
    playlistConfigurationParameters: PlaylistConfigurationParameters;
    playlistPlan: PlaylistPlan;
}