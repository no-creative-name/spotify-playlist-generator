import React, { useState, useEffect, useCallback, EventHandler, SyntheticEvent } from 'react';
import styled from 'styled-components';
import { Button } from '../basic/Button';
import { Box } from '../basic/Box';
import { PlaylistParameters } from '../../interfaces/PlaylistParameters';
import { PlaylistConfigurationParameters } from '../../interfaces/PlaylistConfigurationParameters';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../interfaces/RootState';
import { setPlaylistConfigurationParameters } from '../../actions';

const Label = styled.label`
    font-size: 16px;
`;

const FormSet = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    transition: opacity 0.3s;
`;

const Checkbox = styled.input`
    transform: translate(-20px, 20px);
`

const Input = styled.input`
    margin: 5px 0 15px 0;
    font-size: 18px;
    border-radius: 5px;
    border: none;
    padding: 5px;
`;

interface ChildComponentProps {
    onSubmitForm: ({ }: PlaylistParameters) => void;
}

const ConfigurationForm: React.FC<ChildComponentProps> = ({
    onSubmitForm }) => {
    const playlistConfigurationParameters = useSelector<RootState, PlaylistConfigurationParameters>(state => state.playlistConfigurationParameters);
    const dispatch = useDispatch();

    const [numberOfTracks, setNumberOfTracks] = useState(playlistConfigurationParameters.numberOfTracks);
    const [playlistName, setPlaylistName] = useState(playlistConfigurationParameters.playlistName);
    const [yearToggle, setYearToggle] = useState(playlistConfigurationParameters.yearToggle);
    const [startYear, setStartYear] = useState(playlistConfigurationParameters.startYear);
    const [endYear, setEndYear] = useState(playlistConfigurationParameters.endYear);
    const [bpmToggle, setBpmToggle] = useState(playlistConfigurationParameters.bpmToggle);
    const [startBpm, setStartBpm] = useState(playlistConfigurationParameters.startBpm);
    const [endBpm, setEndBpm] = useState(playlistConfigurationParameters.endBpm);
    const [danceabilityToggle, setDanceabilityToggle] = useState(playlistConfigurationParameters.danceabilityToggle);
    const [danceability, setDanceability] = useState(playlistConfigurationParameters.danceability);
    const [energyToggle, setEnergyToggle] = useState(playlistConfigurationParameters.energyToggle);
    const [energy, setEnergy] = useState(playlistConfigurationParameters.energy);

    const onPlaylistNameInput = useCallback(({ target }) => {
        setPlaylistName(target.value);
    }, []);

    const onStartBpmInput = useCallback(({ target }) => {
        setStartBpm(target.value);
        if (endBpm < target.value) {
            setEndBpm(target.value);
        }
    }, [endBpm]);

    const onEndBpmInput = useCallback(({ target }) => {
        setEndBpm(target.value);
        if (startBpm > target.value) {
            //setStartBpm(target.value);
        }
    }, [startBpm]);

    const onStartYearInput = useCallback(({ target }) => {
        setStartYear(target.value);

        if (target.value.length === 4 && endYear < target.value) {
            setEndYear(target.value);
        }
    }, [endYear]);

    const onEndYearInput = useCallback(({ target }) => {
        setEndYear(target.value);

        if (target.value.length === 4 && startYear > target.value) {
            setStartYear(target.value);
        }
    }, [startYear]);

    const onNumberInput = useCallback(({ target }) => {
        setNumberOfTracks(target.value);
    }, []);

    const onDanceabilityInput = useCallback(({ target }) => {
        setDanceability(target.value);
    }, []);

    const onEnergyInput = useCallback(({ target }) => {
        setEnergy(target.value);
    }, []);

    const onBpmToggle = useCallback(({ target }) => {
        setBpmToggle(target.checked);
    }, []);

    const onYearToggle = useCallback(({ target }) => {
        setYearToggle(target.checked);
    }, []);

    const onDanceabilityToggle = useCallback(({ target }) => {
        setDanceabilityToggle(target.checked);
    }, []);

    const onEnergyToggle = useCallback(({ target }) => {
        setEnergyToggle(target.checked);
    }, []);

    const onButtonClick = () => {
        dispatch(setPlaylistConfigurationParameters({
            playlistName,
            startYear,
            endYear,
            startBpm,
            endBpm,
            danceability,
            energy,
            yearToggle,
            bpmToggle,
            danceabilityToggle,
            energyToggle,
            numberOfTracks
        }))
        onSubmitForm({
            playlistName,
            startBpm: bpmToggle ? startBpm : undefined,
            endBpm: bpmToggle ? endBpm : undefined,
            startYear: yearToggle ? Number(startYear) : undefined,
            endYear: yearToggle ? Number(endYear) : undefined,
            numberOfTracks,
            danceability: danceabilityToggle ? danceability / 100 : undefined,
            energy: energyToggle ? energy / 100 : undefined,
        })
    }

    return (
        <Box>
            <h2>Configuration</h2>
            <FormSet>
                <Label htmlFor="playlistName">Name of playlist</Label>
                <Input autoFocus name="playlistName" type="text" value={playlistName} onChange={onPlaylistNameInput}></Input>
            </FormSet>
            <FormSet>
                <Label htmlFor="numberOfTemplateTracks">Number of template tracks</Label>
                <Input name="numberOfTemplateTracks" type="number" value={numberOfTracks} onChange={onNumberInput}></Input>
            </FormSet>
            <FormSet className={bpmToggle ? '' : 'disabled'}>
                <Checkbox type="checkbox" checked={bpmToggle} onChange={onBpmToggle}></Checkbox>
                <Label htmlFor="startBpm">BPM Range Start</Label>
                <Input disabled={!bpmToggle} name="startBpm" type="number" value={startBpm} onChange={onStartBpmInput}></Input>
                <Label htmlFor="endBpm">BPM Range End</Label>
                <Input disabled={!bpmToggle} name="endBpm" type="number" value={endBpm} onChange={onEndBpmInput}></Input>
            </FormSet>
            <FormSet className={yearToggle ? '' : 'disabled'}>
                <Checkbox type="checkbox" checked={yearToggle} onChange={onYearToggle}></Checkbox>
                <Label htmlFor="startYear">Release period (start year)</Label>
                <Input disabled={!yearToggle} name="startYear" type="number" value={startYear} onChange={onStartYearInput}></Input>
                <Label htmlFor="endYear">Release period (end year)</Label>
                <Input disabled={!yearToggle} name="endYear" type="number" value={endYear} onChange={onEndYearInput}></Input>
            </FormSet>
            <FormSet className={danceabilityToggle ? '' : 'disabled'}>
                <Checkbox type="checkbox" checked={danceabilityToggle} onChange={onDanceabilityToggle}></Checkbox>
                <Label htmlFor="danceability">Danceability</Label>
                <Input disabled={!danceabilityToggle} name="danceability" type="range" value={danceability} onChange={onDanceabilityInput}></Input>
            </FormSet>
            <FormSet className={energyToggle ? '' : 'disabled'}>
                <Checkbox type="checkbox" checked={energyToggle} onChange={onEnergyToggle}></Checkbox>
                <Label htmlFor="energy">Energy</Label>
                <Input disabled={!energyToggle} name="energy" type="range" value={energy} onChange={onEnergyInput}></Input>
            </FormSet>
            <Button onClick={onButtonClick}>Get Playlist</Button>
        </Box>
    )
}

export default ConfigurationForm;