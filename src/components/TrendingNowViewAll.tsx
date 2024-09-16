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

const TrendingNowViewAll: React.FC = () => {
    const apiService = new ApiService();

    const [result, setResult] = useState<SearchResult>();

    const getTrendingMovies = async (page: number) => {
        try {
          const res = await apiService.getTrendingMovies(page);
          if (res) {
            console.log("getTrendingMovies: ", res);
            setResult(res)
          }
        } catch (error) {
          console.log("Fail to fetch Watch list movies!");
        }
      };
  
    useEffect(() => {
        getTrendingMovies(page);
    });

    const navigate = useNavigate();

    const goToMovieDetail = (movieId: string) => {
        navigate(`/movie/${movieId}`); // Navigate to movie detail page with the movieId as a param
    };

    
    const [genreList, setGenreList] = useState<Genre[]>([]);

    const [page, setPage] = useState(1);
    const [sortedBy, setSortedBy] = useState({
        key: "popularity.desc",
        label: "Popularity",
    });
    const [selectedGenre, setSelectedGenre] = useState<Genre>({ id: 0, name: 'All' });

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        getTrendingMovies(page)

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
                Trending Now
            </Typography>

           
            <Grid container spacing={3} sx={{ minHeight: '50vh' }}>
                {
                    result?.results.length == 0 && (
                        <Stack direction="row" justifyContent="center" alignItems="center" sx={{ height: "80vh", width: "100vw" }}>
                            <CircularProgress />
                        </Stack>
                    )
                }
                {result?.results.map((movie) => (
                    <Grid item xs={12} sm={4} md={3} lg={2} key={movie.id}>
                        <MovieCard id={movie.id} title={movie.title} image={movie.image} year={movie.releaseYear} onClick={(id) => goToMovieDetail(id)} />
                    </Grid>
                ))}
            </Grid>

            {/* Pagination */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, bgcolor: 'black', p: 2, borderRadius: 2 }}>
                <Pagination
                    count={Math.ceil(result?.total_results!! / 10)}
                    page={page}
                    onChange={handlePageChange}
                    sx={{
                        '& .MuiPaginationItem-root': {
                            color: 'white', // Default text color
                        },
                        '& .Mui-selected': {
                            backgroundColor: 'yellow', // Selected background color
                            color: 'black', // Text color on selected
                        },
                    }}
                    color="primary"
                />
            </Box>
        </Box>
    );
};

export default TrendingNowViewAll;
