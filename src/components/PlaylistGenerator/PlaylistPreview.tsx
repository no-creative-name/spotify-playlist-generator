import { PlaylistPlan } from './';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '../Button';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    overflow-x: scroll;
    padding: 20px;
    margin: 10px;
    border-radius: 5px;
    background-color: lightgreen;
`;

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

    useEffect(() => {
        setNotification('')
    }, [playlistData]);

    const onButtonClick = () => {
        onPlaylistCreate();
        setNotification(`Great! Your playlist ${playlistData.name} has been created. Check it out in your Spotify client! 🥳`)
    }

    return (
        <Container>
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
                        <Button onClick={onButtonClick}>Create Playlist</Button>
                    </React.Fragment>
               )
            }
        </Container>
    )
}

export default PlaylistPreview;