import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Grid, Typography, Card, CardMedia, CardContent, CircularProgress, Stack, AppBar, Alert } from '@mui/material';
import ApiService from '../service/ApiService';
import { MovieDetail, MovieImage, MovieSummary } from '../model/Model';
import CustomAppBar from './common/AppBar';
import StarRateIcon from '@mui/icons-material/StarRate';
import CustomChip from './common/CustomChip';
import TransparentButton from './common/TransparentButton';
import WhiteButton from './common/WhiteButton';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import AddIcon from '@mui/icons-material/Add';
import MovieCard from './common/MovieCard';
import { useNavigate } from 'react-router-dom';
import VideoPlayer from './common/VideoPlayer';
import ImageTile from './common/ImageTile';
import Footer from './common/Footer';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';

const WatchNowPage: React.FC = () => {
    const apiService = new ApiService();

    const { movieId } = useParams<{ movieId: string }>();
    const [movie, setMovie] = useState<MovieDetail | null>(null);
    const [recommendations, setRecommendations] = useState<MovieSummary[]>([]);
    const [relatedImages, setRelatedImages] = useState<MovieImage[]>([]);

    const navigate = useNavigate();

    // SnackBar
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    const goToMovieDetail = (movieId: string) => {
        navigate(`/movie/${movieId}`); // Navigate to movie detail page with the movieId as a param
    };

    const getMovieDetailById = async (movieId: number) => {
        try {
            const res = await apiService.getMovieDetailById(movieId);
            if (res) {
                console.log("getMovieDetailById: ", res);
                setMovie(res);
            }
        } catch (error) {
            console.log("Fail to fetch movies by id!");
        }
    };

    const getRecommendedMovies = async (movieId: number) => {
        try {
            const res = await apiService.getRecommendedMovies(movieId);
            if (res) {
                console.log("getRecommendedMovies: ", res);
                setRecommendations(res);
            }
        } catch (error) {
            console.log("Fail to fetch recommended movies!");
        }
    };
    const getRelatedImages = async (movieId: number) => {
        try {
            const res = await apiService.getRelatedImages(movieId);
            if (res) {
                console.log("getRelatedImages: ", res);
                setRelatedImages(res);
            }
        } catch (error) {
            console.log("Fail to fetch related images!");
        }
    };

    // Fetch movie details and recommendations using the movieId
    useEffect(() => {
        getMovieDetailById(Number(movieId));
        getRecommendedMovies(Number(movieId));
        getRelatedImages(Number(movieId));
    }, [movieId]);

    if (!movie) return (

        <Stack direction="row" justifyContent="center" alignItems="center" sx={{ height: "100vh", width: "100vw" }}>
            <CircularProgress />
        </Stack>
    )
    return (
        <>
            {/* <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message="Successfully added to Watch List!"
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Successfully added to Watch List!
                </Alert>
            </Snackbar> */}
            <Box
                sx={{
                    position: 'relative',
                    minHeight: '100vh',
                    width: '100%',
                    backgroundImage: `url(${movie.poster_path})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    '&:before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.9)',  // Dark overlay
                        backdropFilter: 'blur(5px)'
                    },
                }}
            >

                <Box sx={{ position: 'relative', zIndex: 1, pt: { xs: '10%', md: '5%' } }}>
                    <Grid container spacing={4} sx={{ p: { xs: 2, md: 8 } }}>
                        {/* First Column: Poster, Title, Summary, Buttons */}
                        <Grid item xs={12} md={9} spacing={4}>
                          
                            {/* Trailor */}
                            <Box>
                                <Typography variant="h5" sx={{ mb: 4 }}>
                                    {movie.original_title}
                                </Typography>

                                <VideoPlayer
                                    url="https://link.testfile.org/bNYZFw"
                                    title="Sample Video"

                                />
                            </Box>

                        </Grid>

                        {/* Second Column: Recommended Movies */}
                        <Grid item xs={12} md={3}>
                            <Typography variant="h6" sx={{ mb: 4 }}>
                                You may also like
                            </Typography>
                            <Grid container spacing={2} sx={{ display: { xs: 'none', md: 'flex' } }}>
                                {recommendations.map((recommendation) => (
                                    <Grid item xs={6} sm={6} key={recommendation.id}>
                                        <Card sx={{ display: 'flex' }} onClick={() => goToMovieDetail(recommendation.id)}>
                                            <CardMedia
                                                component="img"
                                                image={recommendation.image}
                                                alt="Live from space album cover"
                                            />
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                            <Stack
                                direction={'row'}
                                spacing={4}
                                sx={{
                                    overflowX: 'auto', // Enable horizontal scrolling
                                    display: { xs: 'flex', md: 'none' }
                                }}
                            >
                                {recommendations.map((movie) => (

                                    <MovieCard id={movie.id} title={movie.title} image={movie.image} year={movie.releaseYear} onClick={(id) => goToMovieDetail(id)} />

                                ))}

                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

        </>
    );
};

export default WatchNowPage;
