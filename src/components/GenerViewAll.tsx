// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { Box, Grid, Typography, TextField, Pagination, Card, CardMedia, CardContent, Collapse, alpha, InputBase, styled, Stack, CircularProgress, Autocomplete } from '@mui/material';
// import { Search as SearchIcon } from '@mui/icons-material';
// import IconButton from '@mui/material/IconButton';
// import InputAdornment from '@mui/material/InputAdornment';
// import { useSearchParams } from 'react-router-dom';
// import ApiService from '../service/ApiService';
// import { Genre, MovieSummary, SearchResult } from '../model/Model';
// import MovieCard from './common/MovieCard';

// const GenreViewAll: React.FC = () => {
//     const apiService = new ApiService();
//     const { genreId } = useParams<{ genreId: string }>();

//     const [result, setResult] = useState<SearchResult>();

//     const getMovieByGenre = async (genre: number, page: number) => {
//         try {
//           const res = await apiService.getMovieByGenre(genre, page);
//           if (res) {
//             console.log("getMovieByGenre: ", res);
//             setResult(res)
//           }
//         } catch (error) {
//           console.log("Fail to fetch genre movies!");
//         }
//       };
  
//     useEffect(() => {
//         getMovieByGenre(Number(genreId), page);
//     });

//     const navigate = useNavigate();

//     const goToMovieDetail = (movieId: string) => {
//         navigate(`/movie/${movieId}`); // Navigate to movie detail page with the movieId as a param
//     };

//     const [page, setPage] = useState(1);
   
//     const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
//         setPage(value);
//         getMovieByGenre(Number(genreId), page)

//     };
//     return (
//         <Box sx={{ p: 3, mt: 12 }}>
//             {/* Search Bar */}
//             {/* <form onSubmit={handleSearchSubmit}>

//                 <Box sx={{ display: 'flex', mb: 8, justifyContent: 'center', width: '100%' }}>
//                     <Box sx={{ width: { xs: '100%', md: '50%' } }}>
//                         <Search>
//                             <SearchIconWrapper>
//                                 <SearchIcon />
//                             </SearchIconWrapper>
//                             <StyledInputBase placeholder="Search…" aria-label="search" value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)} />
//                         </Search>
//                     </Box>
//                 </Box>
//             </form> */}

//             <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', mt: 4, mb: 8 }}>
//                 Trending Now
//             </Typography>

           
//             <Grid container spacing={3} sx={{ minHeight: '50vh' }}>
//                 {
//                     result?.results.length == 0 && (
//                         <Stack direction="row" justifyContent="center" alignItems="center" sx={{ height: "80vh", width: "100vw" }}>
//                             <CircularProgress />
//                         </Stack>
//                     )
//                 }
//                 {result?.results.map((movie) => (
//                     <Grid item xs={12} sm={4} md={3} lg={2} key={movie.id}>
//                         <MovieCard id={movie.id} title={movie.title} image={movie.image} year={movie.releaseYear} onClick={(id) => goToMovieDetail(id)} />
//                     </Grid>
//                 ))}
//             </Grid>

//             {/* Pagination */}
//             <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, bgcolor: 'black', p: 2, borderRadius: 2 }}>
//                 <Pagination
//                     count={Math.ceil(result?.total_results!! / 10)}
//                     page={page}
//                     onChange={handlePageChange}
//                     sx={{
//                         '& .MuiPaginationItem-root': {
//                             color: 'white', // Default text color
//                         },
//                         '& .Mui-selected': {
//                             backgroundColor: 'yellow', // Selected background color
//                             color: 'black', // Text color on selected
//                         },
//                     }}
//                     color="primary"
//                 />
//             </Box>
//         </Box>
//     );
// };

// export default GenreViewAll;

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Grid, Typography, TextField, Pagination, Card, CardMedia, CardContent, Collapse, alpha, InputBase, styled, Stack, CircularProgress, Autocomplete } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useSearchParams } from 'react-router-dom';
import ApiService from '../service/ApiService';
import { Genre, SearchResult } from '../model/Model';
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

const GenreViewAll: React.FC = () => {
    const apiService = new ApiService();
    const { genreId } = useParams<{ genreId: string }>();

    const [result, setResult] = useState<SearchResult>();
    const [genreList, setGenreList] = useState<Genre[]>([]);

    const [page, setPage] = useState(1);
    const [sortedBy, setSortedBy] = useState({
        key: "popularity.desc",
        label: "Popularity",
    });

    const [selectedGenre, setSelectedGenre] = useState<Genre>({id: 0, name: 'All'});

    const discoverMovies = async (page: number, sortedBy: string, genre: number) => {
        try {
            const res = await apiService.discoverMovies(page, sortedBy, genre);
            if (res) {
                console.log("discoverMovies: ", res);
                setResult(res);
            }
        } catch (error) {
            console.log("Fail to fetch movies!");
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

    useEffect(() => {
        let genre = null;

        getGenreList().then(res=>{
            genre = genreList?.find(item=> item.id == Number(genreId));
            if(!genre){
                genre = {id: 0, name: 'All'}
            }
             setSelectedGenre(genre!!);

        });
       
        console.log("gener: ", genre);

        discoverMovies(page, sortedBy.key, Number(genreId));
    }, [page, genreId]);

    const sortByList = [
        {
            key: "popularity.desc",
            label: "Popularity",
        },
        {
            key: "primary_release_date.desc",
            label: "Release Date",
        },{
            key: "title.asc",
            label: "Title (A-Z)",
        }

        ]
            // const handleSearchSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     if (searchQuery!!.trim()) {
    //         discoverMovies(searchQuery!!, 1);
    //         setPage(1);
    //     }
    // };

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
                Discover Movies By Genre
            </Typography>

            <Stack direction="row" spacing={2} justifyContent="start" alignItems="center" sx={{ mb: 4 }}>
                <Autocomplete
                    value={selectedGenre}
                    options={genreList}
                    renderInput={(params) => <TextField {...params} />}
                    getOptionLabel={(option) => option.name}
                    size='small'
                    onChange={(event, newValue) => {
                        setSelectedGenre(newValue!!)
                        discoverMovies(page, sortedBy.key, newValue!!.id)
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
                    }}
                />

                <Autocomplete
                    value={sortedBy}
                    options={sortByList}
                    renderInput={(params) => <TextField {...params} />}
                    getOptionLabel={(option) => option.label}
                    size='small'
                    onChange={(event, newValue) => {
                        setSortedBy(newValue!!)
                        discoverMovies(page, newValue!!.key, selectedGenre.id)
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
                    }}
                />
            </Stack>
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

export default GenreViewAll;
