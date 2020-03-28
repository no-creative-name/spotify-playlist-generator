import React from 'react';
import { CenterBox } from '../basic/CenterBox';
import { Button, SmallButton } from '../basic/Button';
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from '../../interfaces/RootState';

const SuccessScreen: React.FC = () => {
    const playlistId = useSelector<RootState, string>(state => state.playlistId);
    const history = useHistory();

    const restartGeneration = () => {
        history.push('/generate');
    }

    return (<CenterBox>
        <h3>Great! Your playlist has been created. Check it out in your Spotify client!</h3>
        <a href={`https://open.spotify.com/playlist/${playlistId}`} target="_blank"><SmallButton>Check it out here</SmallButton></a>
        <Button onClick={() => restartGeneration()}>Create another playlist</Button>
    </CenterBox>)
}

export default SuccessScreen;