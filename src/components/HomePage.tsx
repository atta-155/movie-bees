import React, { useEffect, useState } from 'react';
import { Box, Chip, Container, Stack, Collapse, IconButton, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, Alert } from '@mui/material';
import logo from '../assets/MovieBees.png';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import StarRateIcon from '@mui/icons-material/StarRate';
import AddIcon from '@mui/icons-material/Add';
import WhiteButton from './common/WhiteButton';
import TransparentButton from './common/TransparentButton';
import homeBG from '../assets/home_bg.jpeg';
import CustomChip from './common/CustomChip';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import MovieCard from './common/MovieCard';
import ApiService from '../service/ApiService';
import { Genre, MovieSummary } from '../model/Model';
import Autocomplete from '@mui/material/Autocomplete';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import CustomAppBar from './common/AppBar';
import Footer from './common/Footer';
import { useNavigate } from 'react-router-dom';
import Snackbar, {  SnackbarCloseReason } from '@mui/material/Snackbar';

const HomePage: React.FC = () => {
  const apiService = new ApiService();

  const [trendingMovies, setTrendingMovies] = useState<MovieSummary[]>([]);
  const [genreList, setGenreList] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<Genre>({ id: 0, name: 'All' });
  const [movieByGenre, setMovieByGenre] = useState<MovieSummary[]>([]);
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
    navigate(`/movie/${movieId}`); 
  };
  const goToMovieWatchNow = (movieId: string) => {
    console.log("goToMovieWatchNow: ", movieId);
    navigate(`/watch/${movieId}`); 
  };

  const getTrendingMovies = async () => {
    try {
      const res = await apiService.getTrendingMovies();
      if (res) {
        console.log("getTrendingMovies: ", res);
        setTrendingMovies(res)
      }
    } catch (error) {
      console.log("Fail to fetch trending movies!");
    }
  };

  const getGenreList = async () => {
    try {
      const res = await apiService.getGenrelist();
      if (res) {
        console.log("getGenreList: ", res);
        res.unshift({ id: 0, name: "All" })
        setGenreList(res);
      }
    } catch (error) {
      console.log("Fail to fetch genre list!");
    }
  };

  const getMovieByGenre = async (genre: number) => {
    try {
      const res = await apiService.getMovieByGenre(genre);
      if (res) {
        console.log("getMovieByGenre: ", res);
        setMovieByGenre(res)
      }
    } catch (error) {
      console.log("Fail to fetch genre movies!");
    }
  };


  useEffect(() => {
    getGenreList();
    getTrendingMovies();
    getMovieByGenre(0);

  }, []);

  return (
    <Box>
      <Snackbar
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
      </Snackbar>
      {/* Background Image */}
      <Box
        sx={{
          position: 'relative',
          height: '100vh', // Full screen height
          width: '100%',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.4) 30%, rgba(0, 0, 0, 0.8) 60%, rgba(0, 0, 0, 1) 100%), url(${homeBG}) no-repeat center center`,
            backgroundSize: 'cover',
            zIndex: -1,
          },
          marginTop: '-64px',
        }}
      >
        {/* Header Text */}
        <Container
          sx={{
            position: 'absolute',
            top: '50%',
            left: '0%',
            width: '100%',
            transform: 'translate(0%, -50%)',
            // textAlign: { xs: 'center', md: 'start' },
            color: 'white',
            zIndex: 10,
            // padding: { xs: 2, md: 0 },
          }}
        >
          <Stack direction={'row'} spacing={1} justifyContent={'start'}>
            <CustomChip text="Action Epic" />
            <CustomChip text="Adventure" />
            <CustomChip text="Sci-Fi" />
          </Stack>

          <Typography variant="h4" component="h1" sx={{ fontSize: { xs: '2rem', md: '4rem' }, marginTop: { xs: 2, sm: 2 } }}>
            Dune: Part Two
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center" sx={{ marginBottom: 4, }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <StarRateIcon sx={{ color: 'yellow' }} />
              <Typography variant="body1" className='muted-color'>8.5</Typography>
            </Stack>
            <Box component="span" sx={{ display: { xs: 'none', sm: 'block' } }} className='muted-color'>•</Box>
            <Typography variant="body1" className='muted-color'>2024</Typography>
            <Box component="span" sx={{ display: { xs: 'none', sm: 'block' } }} className='muted-color'>•</Box>
            <Typography variant="body1" className='muted-color'>2h 47m</Typography>
          </Stack>

          <Typography variant="body1" component="p" sx={{ width: { xs: '100%', md: '70%' }, marginBottom: 4 }}>
            Paul Atreides unites with Chani and the Fremen to avenge his family's fall. Torn between love and destiny, he grapples with a choice: to embrace his role as the prophesied leader or risk the universe's fate to save the one he loves.
          </Typography>

          <Typography className='muted-color' variant="subtitle2" component="p" sx={{ marginBottom: 2 }}>
            Directed by Denis Villeneuve
          </Typography>

          <Stack direction={'row'} spacing={2}>
            <WhiteButton text="Watch Now" startIcon={<PlayArrowRoundedIcon/>}  onClick={()=>{goToMovieWatchNow("693134")}}  />
            <TransparentButton text="Add to WatchList" startIcon={<AddIcon />} onClick={handleClick} />


          </Stack>
        </Container>
      </Box>

      <Container maxWidth={false} sx={{
        paddingBottom: '100px'
      }}>
        {/* Trending Movies */}
        <Box
          sx={{
            position: 'relative',
            left: 0,
            // top: '-10%',
            transform: 'translate(0%, -20%)',
            zIndex: 100,
            color: 'white',
            // padding: '0px 32px',
            marginBottom: '5%'
          }}
        >
          <Stack direction={'row'} justifyContent='space-between' alignItems='center' sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" sx={{ marginBottom: 2 }}>
              Trending Now
            </Typography>
            <TransparentButton text="View All" endIcon={<KeyboardDoubleArrowRightIcon />} />
          </Stack>

          <Stack
            direction={'row'}
            spacing={4}
            sx={{
              overflowX: 'auto', // Enable horizontal scrolling

            }}
          >
            {
              trendingMovies.map((movie) => (
                <MovieCard id={movie.id} title={movie.title} image={movie.image} year={movie.releaseYear} onClick={(id) => goToMovieDetail(id)} />
              ))
            }
          </Stack>

        </Box>

        {/* Generes */}
        <Stack direction={'row'} justifyContent='space-between' alignItems='center' sx={{ mb: 4 }}>

          <Stack direction={'row'} justifyContent='start' alignItems='center' spacing={4} sx={{ display: { xs: 'none', lg: 'flex' } }}>
            {
              genreList.map((genre) => (
                selectedGenre.id == genre.id ?
                  <WhiteButton key={genre.id} text={genre.name} onClick={() => {
                    setSelectedGenre(genre)
                    getMovieByGenre(genre.id)
                  }} />
                  :
                  <TransparentButton key={genre.id} text={genre.name} onClick={() => {
                    setSelectedGenre(genre)
                    getMovieByGenre(genre.id)
                  }} />
              ))
            }
          </Stack>

          <Autocomplete
            value={selectedGenre}
            options={genreList}
            renderInput={(params) => <TextField {...params} />}
            getOptionLabel={(option) => option.name}
            size='small'
            onChange={(event, newValue) => {
              setSelectedGenre(newValue!!)
              getMovieByGenre(newValue!!.id)
            }}
            sx={{
              width: 200,
              zIndex: 10000,
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'black',      // Input background color
                color: 'white',                // Input text color
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',          // Border color
              },
              '& .MuiAutocomplete-popupIndicator': {
                color: 'white',                // Icon color
              },
              '& .MuiAutocomplete-listbox': {
                backgroundColor: 'black',      // Dropdown background color
                color: 'white',                // Dropdown text color
              },
              '& .MuiAutocomplete-option': {
                '&[data-focus="true"]': {
                  backgroundColor: 'gray',     // Highlighted option background
                  color: 'white',              // Highlighted option text color
                },
              },
              display: { xs: 'flex', lg: 'none' },
            }}
          />

          <TransparentButton text="View All" endIcon={<KeyboardDoubleArrowRightIcon />} />

        </Stack>

        <Stack
          direction={'row'}
          spacing={4}
          sx={{
            overflowX: 'auto', // Enable horizontal scrolling
            marginTop: 2
          }}
        >
          {
            movieByGenre.map((movie) => (
              <MovieCard id={movie.id} title={movie.title} image={movie.image} year={movie.releaseYear} onClick={(id) => goToMovieDetail(id)} />
            ))
          }
        </Stack>


      </Container>

    </Box>
  );
};

export default HomePage;
