import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Grid, Typography, TextField, Pagination, Card, CardMedia, CardContent, Collapse, alpha, InputBase, styled, Stack } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useSearchParams } from 'react-router-dom';
import ApiService from '../service/ApiService';
import { SearchResult } from '../model/Model';
import MovieCard from './common/MovieCard';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '4px',  // Updated for cylindrical shape
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '50ch',
      // '&:focus': {
      //   width: '80ch',
      // },
    },
  },
}));

const SearchPage: React.FC = () => {
  const apiService = new ApiService();

  const [searchQuery, setSearchQuery] = useState("");
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const [result, setResult] = useState<SearchResult>();

  const searchMovieByQuery = async (query: string, page: number) => {
    try {
      const res = await apiService.searchMovieByQuery(query, page);
      if (res) {
        console.log("searchMovieByQuery: ", res);
        setResult(res);
      }
    } catch (error) {
      console.log("Fail to fetch search result!");
    }
  };

  useEffect(() => {
    searchMovieByQuery(searchQuery!!, page);
  }, [page]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery!!.trim()) {
      searchMovieByQuery(searchQuery!!, 1);
      setPage(1);
    }
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const navigate = useNavigate();

  const goToMovieDetail = (movieId: string) => {
    navigate(`/movie/${movieId}`); // Navigate to movie detail page with the movieId as a param
  };

  return (
    <Box sx={{ p: 3, mt: 12 }}>
      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit}>

        <Box sx={{ display: 'flex', mb: 8, justifyContent: 'center', width: '100%' }}>
          <Box sx={{ width:{xs: '100%', md: '50%'} }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase placeholder="Search…" aria-label="search" value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} />
            </Search>
          </Box>
        </Box>
      </form>

      {/* Results */}
      {
        result?.results.length != 0 &&
        (
          <Stack sx={{ mb: 4 }} direction={'row'} justifyContent={'space-between'} alignItems={'center'} spacing={2}>
            <Typography variant="h6" gutterBottom>
              {`Search results`}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {` (${result?.total_results} results found)`}
            </Typography>
          </Stack>
        )

      }

      <Grid container spacing={3} sx={{minHeight: '50vh'}}>
        {
          result?.results.length == 0 && <Stack direction={'row'} sx={{width: '100%', height: '50vh'}} justifyContent={'center'} alignItems={'center'}>
            <Typography variant="h6" gutterBottom className='muted-color'>No Result...</Typography>
          </Stack>
        }
        {result?.results.map((movie) => (
          <Grid item xs={6} sm={6} md={3} lg={2} key={movie.id}>
            <MovieCard id={movie.id} title={movie.title} image={movie.image} year={movie.releaseYear} onClick={(id) => goToMovieDetail(id)} />
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, bgcolor: 'black', p: 2, borderRadius: 2 }}>
        <Pagination
          count={Math.ceil(result?.total_results!! / 20)}
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

export default SearchPage;
