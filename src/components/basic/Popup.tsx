import styled from 'styled-components';

import React from 'react';

interface ChildComponentProps {
    onClose(): any;
}

export const Popup: React.FC<ChildComponentProps> = ({ children, onClose }) => {
    const Overlay = styled.div`
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
        background-color: rgba(0.6, 0.6, 0.6 , 0.6);
    `

    const Container = styled.div`
        position: fixed;
        top: 50%;
        left: 50%;
        width: 80%;
        background-color: white;
        text-align: center;
        transform: translate(-50%, -50%);
        padding: 25px;
        box-sizing: border-box;
        border-radius: 5px;
        user-select: none;
        cursor: normal;
    `;

    const onClick = () => {
        onClose();
    }

return (<Overlay onClick={onClick}><Container>{children}</Container></Overlay>)
}