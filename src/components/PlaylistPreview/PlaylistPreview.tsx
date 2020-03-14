import { PlaylistPlan } from '../PlaylistGenerator';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '../basic/Button';
import { useHistory } from "react-router-dom";
import { Box } from '../basic/Box';

const List = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
    padding: 0;
`;

const ListItem = styled.li`
    background-color: white;
    list-style-type: none;
    padding: 5px;
    margin-bottom: 5px;
    border-radius: 5px;
`;

const Artist = styled.p`
    font-size: 16px;
    margin: 0;
`;

const Title = styled.p`
    font-size: 20px;
    font-weight: bold;
    margin: 5px 0 0 0;
`;

interface ChildComponentProps {
    playlistData: PlaylistPlan;
    onPlaylistCreate: Function;
}

const NUMBER_OF_PREVIEW_TRACKS = 8;

const PlaylistPreview: React.FC<ChildComponentProps> = ({ playlistData, onPlaylistCreate }) => {
    const [notification, setNotification] = useState('');
    const history = useHistory();

    useEffect(() => {
        setNotification('')
    }, [playlistData]);

    const onCreateClick = () => {
        onPlaylistCreate();
        setNotification(`Great! Your playlist ${playlistData.name} has been created. Check it out in your Spotify client! 🥳`)
    }

    const onRedoClick = () => {
        history.goBack();
    }

    return (
        <Box>
            {
                notification ? (<div>{notification}</div>) : (
                    <React.Fragment>
                        <h2>{playlistData.name}</h2>
                        <List>
                            {playlistData.trackInfos.map((t, idx) => {
                                if (idx <= NUMBER_OF_PREVIEW_TRACKS) {
                                    return (
                                        <ListItem key={t.track.id}>
                                            <Artist>
                                                {t.track.artists[0].name}
                                            </Artist>
                                            <Title>
                                                {t.track.name}
                                            </Title>
                                        </ListItem>
                                    );
                                }
                                if (idx === NUMBER_OF_PREVIEW_TRACKS + 1) {
                                    return (<ListItem key="more">...</ListItem>);
                                }
                            })}
                        </List>
                        <Button onClick={onCreateClick}>Create Playlist</Button>
                        <Button onClick={onRedoClick}>Readjust Parameters</Button>
                    </React.Fragment>
               )
            }
        </Box>
    )
}

export default PlaylistPreview;