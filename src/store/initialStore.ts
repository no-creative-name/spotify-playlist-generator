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
      danceability: [0, 100],
      energyToggle: false,
      energy: [0, 100],
      valenceToggle: false,
      valence: [0, 100],
    },
    playlistPlan: {
      name: '',
      trackUris: [],
      trackInfos: []
    },
    playlistId: ''
  };