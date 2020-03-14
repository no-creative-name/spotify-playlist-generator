import { ExtendedTrackObject } from './ExtendedTrackObject';

export interface PlaylistPlan {
    name: string;
    trackUris: string[];
    trackInfos: ExtendedTrackObject[];
}