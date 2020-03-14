import React from 'react';
import { CenterBox } from '../basic/CenterBox';
import { Button } from '../basic/Button';
import { useHistory } from "react-router-dom";

const SuccessScreen: React.FC = () => {
    const history = useHistory();

    const restartGeneration = () => {
        history.push('/generate');
    }

    return (<CenterBox>
        <h3>Great! Your playlist has been created. Check it out in your Spotify client!</h3>
        <Button onClick={() => restartGeneration()}>Create another playlist</Button>
    </CenterBox>)
}

export default SuccessScreen;