import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Grid, Typography, TextField, Pagination, Card, CardMedia, CardContent, Collapse, alpha, InputBase, styled, Stack, CircularProgress, Autocomplete } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useSearchParams } from 'react-router-dom';
import ApiService from '../service/ApiService';
import { Genre, MovieSummary, SearchResult } from '../model/Model';
import MovieCard from './common/MovieCard';

const WatchListPage: React.FC = () => {
    const apiService = new ApiService();

    const [result, setResult] = useState<MovieSummary[]>([]);

    const getTrendingMovies = async () => {
        try {
          const res = await apiService.getTrendingMovies();
          if (res) {
            console.log("getTrendingMovies: ", res);
            setResult(res)
          }
        } catch (error) {
          console.log("Fail to fetch Watch list movies!");
        }
      };
  
    useEffect(() => {
        getTrendingMovies();
    });

    const navigate = useNavigate();

    const goToMovieDetail = (movieId: string) => {
        navigate(`/movie/${movieId}`); // Navigate to movie detail page with the movieId as a param
    };

    return (
        <Box sx={{ p: 3, mt: 12 }}>
            {/* Search Bar */}
            {/* <form onSubmit={handleSearchSubmit}>

                <Box sx={{ display: 'flex', mb: 8, justifyContent: 'center', width: '100%' }}>
                    <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase placeholder="Search…" aria-label="search" value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)} />
                        </Search>
                    </Box>
                </Box>
            </form> */}

            <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', mt: 4, mb: 8 }}>
                Watch List Movies
            </Typography>

           
            <Grid container spacing={3} sx={{ minHeight: '50vh' }}>
                {
                    result?.length == 0 && (
                        <Stack direction="row" justifyContent="center" alignItems="center" sx={{ height: "80vh", width: "100vw" }}>
                            <CircularProgress />
                        </Stack>
                    )
                }
                {result?.map((movie) => (
                    <Grid item xs={12} sm={4} md={3} lg={2} key={movie.id}>
                        <MovieCard id={movie.id} title={movie.title} image={movie.image} year={movie.releaseYear} onClick={(id) => goToMovieDetail(id)} />
                    </Grid>
                ))}
            </Grid>

           
        </Box>
    );
};

export default WatchListPage;
