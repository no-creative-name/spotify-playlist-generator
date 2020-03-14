import React from 'react';
import { CenterBox } from '../basic/CenterBox';

const SuccessScreen: React.FC = () => {
    return (<CenterBox>
        <h3>Great! Your playlist has been created. Check it out in your Spotify client!</h3>
    </CenterBox>)
}

export default SuccessScreen;