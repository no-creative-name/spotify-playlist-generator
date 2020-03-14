import { PlaylistPlan } from '../../interfaces/PlaylistPlan';
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
    font-size: 16px;
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
        history.push('/success');
    }

    const onRedoClick = () => {
        history.goBack();
    }

    const shuffleArray = (array: any[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    return (
        <Box>
            {
                notification ? (<div>{notification}</div>) : (
                    <React.Fragment>
                        <h1>{playlistData.name}</h1>
                        <h2>{playlistData.trackUris.length} tracks</h2>
                        <List>
                            {shuffleArray(playlistData.trackInfos).map((t, idx) => {
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