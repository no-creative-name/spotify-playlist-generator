export const initialStore = {
    accessToken: '',
    playlistConfigurationParameters: {
      numberOfTracks: 1000,
      playlistName: "New Playlist",
      yearToggle: false,
      startYear: 1960,
      endYear: 2020,
      bpmToggle: false,
      startBpm: 80,
      endBpm: 180,
      danceabilityToggle: false,
      danceability: 0.5,
      energyToggle: false,
      energy: 0.5,
    },
    playlistPlan: {
      name: '',
      trackUris: [],
      trackInfos: []
    }
  };