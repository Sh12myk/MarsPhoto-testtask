import React, {useState, useEffect} from 'react';
import CardStyled from './card/card';
import SimpleSelect from './select/select';
import NasaService from '../services/Api';
import './app.css';
import {makeStyles} from '@mui/styles';
import {styled} from '@mui/styles';
import {grey} from '@mui/material/colors';
import Button from '@mui/material/Button';
import {Input} from '@mui/material';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import useSound from 'use-sound';


const LoadMoreButton = styled(Button)({});

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: 40,
        marginRight: 40
    },
    inputSolDay: {
        border: 'none',
        backgroundColor: grey[300],
        width: 50,
        height: 20,
        marginLeft: 10
    },
}));

const App = () => {
    const soundUrl = 'sound/click.mp3';

    const [playbackRate, setPlaybackRate] = React.useState(0.75);

    const [play] = useSound(soundUrl, {
      playbackRate,
      volume: 0.5,
    });
  
    const handleClick = () => {
      setPlaybackRate(playbackRate + 0.1);
      play();
    };

  
    const classes = useStyles();
    const service = new NasaService();
    const [photos, setPhotos] = useState(null);
    const [activeRover, setActiveRover] = useState('');
    const [activeCamera, setActiveCamera] = useState('');
    const [activePhotos, setActivePhotos] = useState(8);
    const [sol, setSol] = useState(1);
    const optionsRovers = ['Curiosity', 'Opportunity', 'Spirit'];
    let optionsCameras = [];

    if (photos) {
        photos.forEach(photo => {
            if (!optionsCameras.includes(photo.camera.name)) {
                optionsCameras.push(photo.camera.name)
            }
        });
    }

    const getFilteredPhotos = () => {
        if (activeCamera === '') {
            return photos;
        }
        const filteredPhotos = photos.filter(photo => photo.camera.name === activeCamera.toLocaleUpperCase());
        return filteredPhotos;
    };


    const setRover = (event) => {
        setActiveRover(event.target.value);
        setActiveCamera('');
    };

    const setCamera = (event) => {
        setActiveCamera(event.target.value);
    };

    const getCardsPerLoad = () => {
        return getFilteredPhotos().slice(0, activePhotos)
    };

    const pagination = () => {

        if (activePhotos === photos.length) {
            return
        }

        const visiblePhotos = activePhotos + 8;

        if (visiblePhotos > photos.length) {
            setActivePhotos(photos.length);
            return;
        }

        setActivePhotos(visiblePhotos);
    };

    useEffect(function effectFunction() {
            function fetch() {
                service.getPhotos(activeRover, sol)
                    .then(
                        (photos) => {
                            setPhotos(photos);
                            setActiveCamera('');
                            setActivePhotos(8);
                        }
                    );
            }

            fetch()
        },
        [activeRover, sol]);


    return (
        <div className="App">
            <header>MarsPhoto - test task for Clover Dynamics</header>

            <div className="menu-container">
                <menu>
                    <SimpleSelect
                        onClick={handleClick}
                        name={"Rover"}
                        callback={setRover}
                        activeQuery={activeRover}
                        options={optionsRovers}
                    />

                    <SimpleSelect
                        onClick={handleClick}
                        name={"Camera"}
                        callback={setCamera}
                        activeQuery={activeCamera}
                        options={optionsCameras}
                    />
                    <Input
                        onClick={handleClick}
                        placeholder="solar day number"
                        value={sol}
                        className={classes.inputSolDay}
                        type={'number'}
                        onChange={(event) => {
                            if (event.target.value < 1 || event.target.value >= 1001) {
                                return
                            }
                            setSol(event.target.value)
                        }}
                    />

                </menu>
            </div>

            <main>

                {photos && photos.length===0&& <Stack sx={{ width: '50%' }} spacing={2}>
                    <Alert variant="filled" severity="info" fontSize="35">Photo not found, try to choose another sol</Alert>
                </Stack>}

                <div className="content-container">
                    {
                        photos ? getCardsPerLoad().map(photo =>
                            <CardStyled
                                imageSrc={photo.img_src}
                                cameraName={photo.camera.name}
                                earthDate={photo.earth_date}
                                key={photo.id}
                                onClick={handleClick}
                            />
                        ) : null
                    }
                </div>

                {
                    photos && activePhotos < getFilteredPhotos().length ? <LoadMoreButton
                        variant="contained"
                        color="primary"
                        onClick={pagination}
                        
                    >
                        Load more
                    </LoadMoreButton> : null
                }

            </main>

            <footer></footer>

        </div>
    )
};

export default App;
