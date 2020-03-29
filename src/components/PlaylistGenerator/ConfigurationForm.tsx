import React, { useState, useEffect, useCallback, EventHandler, SyntheticEvent, ChangeEvent } from 'react';
import styled from 'styled-components';
import { Button, SmallButton } from '../basic/Button';
import { ContentContainer } from '../basic/ContentContainer';
import { Box } from '../basic/Box';
import { PlaylistParameters } from '../../interfaces/PlaylistParameters';
import { PlaylistConfigurationParameters } from '../../interfaces/PlaylistConfigurationParameters';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../interfaces/RootState';
import { setPlaylistConfigurationParameters } from '../../actions';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import './styles.css';

const Label = styled.label`
    font-size: 16px;
    color: white;
`;

const FormSet = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 10px;
    width: 100%;
    max-width: 100%;
    transition: opacity 0.3s;
    margin: 10px 0;
`;

const InputSet = styled.div`
    display: flex;
    flex-direction: column;
    overflow: visible;
    cursor: pointer;
    margin: 20px 0;
`

const Input = styled.input`
    font-size: 18px;
    border-radius: 5px;
    border: none;
    padding: 15px;
    margin: 5px 0 15px 0px;
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
    const [valenceToggle, setValenceToggle] = useState(playlistConfigurationParameters.valenceToggle);
    const [valence, setValence] = useState(playlistConfigurationParameters.valence);

    const onInputClick = useCallback(({ target }) => {
        target.select();
    }, []);

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

    const onDanceabilityInput = useCallback((event: ChangeEvent<{}>, newValue: number | number[]) => {
        setDanceability((newValue as number[]));
    }, []);

    const onEnergyInput = useCallback((event: ChangeEvent<{}>, newValue: number | number[]) => {
        setEnergy((newValue as number[]));
    }, []);

    const onValenceInput = useCallback((event: ChangeEvent<{}>, newValue: number | number[]) => {
        setValence((newValue as number[]));
    }, []);

    const onBpmToggle = useCallback((bool) => {
        setBpmToggle(bool);
    }, []);

    const onYearToggle = useCallback((bool) => {
        setYearToggle(bool);
    }, []);

    const onDanceabilityToggle = useCallback((bool) => {
        setDanceabilityToggle(bool);
    }, []);

    const onEnergyToggle = useCallback((bool) => {
        setEnergyToggle(bool);
    }, []);

    const onValenceToggle = useCallback((bool) => {
        setValenceToggle(bool);
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
            valence,
            yearToggle,
            bpmToggle,
            danceabilityToggle,
            energyToggle,
            valenceToggle,
            numberOfTracks
        }))
        onSubmitForm({
            playlistName,
            startBpm: bpmToggle ? startBpm : undefined,
            endBpm: bpmToggle ? endBpm : undefined,
            startYear: yearToggle ? Number(startYear) : undefined,
            endYear: yearToggle ? Number(endYear) : undefined,
            numberOfTracks,
            danceability: danceabilityToggle ? danceability.map(d => d / 100.0) : undefined,
            energy: energyToggle ? energy.map(e => e / 100.0) : undefined,
            valence: valenceToggle ? valence.map(v => v / 100.0) : undefined,
        })
    }

    return (
        <Box>
            <h1>Configuration</h1>
            <ContentContainer>
                <InputSet>
                    <Label htmlFor="playlistName">Name of playlist</Label>
                    <Input name="playlistName" type="text" value={playlistName} onClick={onInputClick} onChange={onPlaylistNameInput}></Input>
                    <Label htmlFor="numberOfTemplateTracks">Number of tracks to consider</Label>
                    <Input name="numberOfTemplateTracks" type="number" value={numberOfTracks} onClick={onInputClick} onChange={onNumberInput}></Input>
                </InputSet>
                <FormSet className={bpmToggle ? '' : 'disabled'} onClick={!bpmToggle ? () => onBpmToggle(true) : () => { }}>
                    <InputSet>
                        <Label htmlFor="startBpm">BPM Range Start</Label>
                        <Input disabled={!bpmToggle} name="startBpm" type="number" value={startBpm} onClick={onInputClick} onChange={onStartBpmInput}></Input>
                    </InputSet>
                    <InputSet>
                        <Label htmlFor="endBpm">BPM Range End</Label>
                        <Input disabled={!bpmToggle} name="endBpm" type="number" value={endBpm} onClick={onInputClick} onChange={onEndBpmInput}></Input>
                    </InputSet>
                    {bpmToggle ? (<SmallButton className="disableParameterButton" onClick={() => onBpmToggle(false)}>Disable Parameter</SmallButton>) : ''}
                </FormSet>
                <FormSet className={yearToggle ? '' : 'disabled'} onClick={!yearToggle ? () => onYearToggle(true) : () => { }}>
                    <InputSet>
                        <Label htmlFor="startYear">Release period (start year)</Label>
                        <Input disabled={!yearToggle} name="startYear" type="number" value={startYear} onClick={onInputClick} onChange={onStartYearInput}></Input>
                    </InputSet>
                    <InputSet>
                        <Label htmlFor="endYear">Release period (end year)</Label>
                        <Input disabled={!yearToggle} name="endYear" type="number" value={endYear} onClick={onInputClick} onChange={onEndYearInput}></Input>
                    </InputSet>
                    {yearToggle ? (<SmallButton className="disableParameterButton" onClick={() => onYearToggle(false)}>Disable Parameter</SmallButton>) : ''}
                </FormSet>
                <InputSet className={danceabilityToggle ? '' : 'disabled'} onClick={!danceabilityToggle ? () => onDanceabilityToggle(true) : () => { }}>
                    <Label htmlFor="danceability">Danceability</Label>
                    <Slider disabled={!danceabilityToggle} name="danceability" value={danceability} onChange={onDanceabilityInput}></Slider>
                    {danceabilityToggle ? (<SmallButton className="disableParameterButton" onClick={() => onDanceabilityToggle(false)}>Disable Parameter</SmallButton>) : ''}
                </InputSet>
                <InputSet className={energyToggle ? '' : 'disabled'} onClick={!energyToggle ? () => onEnergyToggle(true) : () => { }}>
                    <Label htmlFor="energy">Energy</Label>
                    <Slider disabled={!energyToggle} name="energy" value={energy} onChange={onEnergyInput}></Slider>
                    {energyToggle ? (<SmallButton className="disableParameterButton" onClick={() => onEnergyToggle(false)}>Disable Parameter</SmallButton>) : ''}
                </InputSet>
                <InputSet className={valenceToggle ? '' : 'disabled'} onClick={!valenceToggle ? () => onValenceToggle(true) : () => { }}>
                    <Label htmlFor="valence">Valence</Label>
                    <Slider disabled={!valenceToggle} name="valence" value={valence} onChange={onValenceInput}></Slider>
                    {valenceToggle ? (<SmallButton className="disableParameterButton" onClick={() => onValenceToggle(false)}>Disable Parameter</SmallButton>) : ''}
                </InputSet>
                <Button onClick={onButtonClick}>Get Playlist</Button>
            </ContentContainer>
        </Box>
    )
}

export default ConfigurationForm;