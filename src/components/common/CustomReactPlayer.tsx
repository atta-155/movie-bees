import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { Box, IconButton, Slider, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import FullscreenIcon from '@mui/icons-material/FullscreenExit';
import FullscreenExitIcon from '@mui/icons-material/Fullscreen';

interface VideoPlayerProps {
    url: string;
    width: string;
    height: string;
}

const CustomReactPlayer: React.FC<VideoPlayerProps> = ({ url, width, height }) => {
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(false);
    const [volume, setVolume] = useState(0.8);
    const [played, setPlayed] = useState(0);
    const [duration, setDuration] = useState(0);
    const [fullscreen, setFullscreen] = useState(false);
    const [hovered, setHovered] = useState(false); // State to manage hover
    const playerRef = useRef<ReactPlayer>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        const handleFullscreenChange = () => {
            if (!document.fullscreenElement) {
                setFullscreen(false);
            }
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);

    const handlePlayPause = () => {
        setPlaying(!playing);
    };

    const handleMute = () => {
        setMuted(!muted);
    };

    const handleVolumeChange = (_: any, newValue: number | number[]) => {
        setVolume(newValue as number);
    };

    const handleProgress = (state: { played: number }) => {
        setPlayed(state.played);
    };

    const handleSeek = (_: any, newValue: number | number[]) => {
        playerRef.current?.seekTo(newValue as number, 'fraction');
    };

    const handleDuration = (duration: number) => {
        setDuration(duration);
    };

    const toggleFullscreen = () => {
        if (!fullscreen) {
            if (containerRef.current) {
                containerRef.current.requestFullscreen();
            }
        } else {
            document.exitFullscreen();
        }
        setFullscreen(!fullscreen);
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    return (
        <Box
            ref={containerRef}
            sx={{
                position: 'relative',
                width: {width},
                // maxWidth: 800,
                height: fullscreen ? '100vh' : (isMobile ? '200px' : {height}),
                overflow: 'hidden',
                cursor: 'none', // Hide cursor over the video
                '&:hover .controls': {
                    opacity: 1, // Show controls on hover
                },
            }}
            className={fullscreen ? 'fullscreen' : ''}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Video Player */}
            <ReactPlayer
                ref={playerRef}
                url={url}
                playing={playing}
                muted={muted}
                volume={volume}
                onProgress={handleProgress}
                onDuration={handleDuration}
                width="100%"
                height="100%"
                controls={false}
            />

            {/* Control Buttons */}
            <Box
                className="controls"
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    bgcolor: 'rgba(0, 0, 0, 0.7)',
                    padding: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    opacity: hovered ? 1 : 0, // Control opacity based on hover
                    transition: 'opacity 0.3s', // Smooth transition for opacity
                }}
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    sx={{ width: '100%' }}
                >
                    {/* Play/Pause Button */}
                    <IconButton onClick={handlePlayPause} color="inherit">
                        {playing ? <PauseIcon sx={{ color: 'white' }} /> : <PlayArrowIcon sx={{ color: 'white' }} />}
                    </IconButton>



                    {/* Progress Bar */}
                    <Stack direction="row" alignItems="center" spacing={4} sx={{ flexGrow: 1, minWidth: 200 }}>
                        <Typography variant="body2" color="white">
                            {formatTime(played * duration)}
                        </Typography>
                        <Slider
                            value={played}
                            onChange={handleSeek}
                            step={0.01}
                            min={0}
                            max={1}
                            sx={{ flexGrow: 1, color: 'white' }}
                        />
                        <Typography variant="body2" color="white">
                            {formatTime(duration)}
                        </Typography>
                    </Stack>
                    {/* Volume Control */}
                    <IconButton onClick={handleMute} color="inherit">
                        {muted || volume === 0 ? <VolumeOffIcon sx={{ color: 'white' }} /> : <VolumeUpIcon sx={{ color: 'white' }} />}
                    </IconButton>
                    <Slider
                        min={0}
                        max={1}
                        step={0.01}
                        value={volume}
                        onChange={handleVolumeChange}
                        sx={{ width: isMobile ? 80 : 120, color: 'white' }}
                    />
                    {/* Fullscreen Button */}
                    <IconButton onClick={toggleFullscreen} color="inherit">
                        {fullscreen ? <FullscreenIcon sx={{ color: 'white' }} /> : <FullscreenExitIcon sx={{ color: 'white' }} />}
                    </IconButton>
                </Stack>
            </Box>
        </Box>
    );
};

export default CustomReactPlayer;
