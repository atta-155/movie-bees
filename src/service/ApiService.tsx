// import { Album, Track } from "../models/ViewModel";
import { Genre, MovieDetail, MovieImage, MovieSummary, SearchResult } from "../model/Model";
import { SearchResultDTO } from "../model/RestModel";
import Api from "./Api";

export default class ApiService {
    constructor() {
    }

    baseUrl = process.env.REACT_APP_BASE_URL!!;
    imgBaseUrl = process.env.REACT_APP_BASE_IMAGE_URL!!;
    api = new Api({ baseUrl: this.baseUrl });

    getTrendingMovies = async (page: number): Promise<SearchResult> => {
        return this.api.getTrendingMovies(page).then(res => {
            let searchResult: SearchResult = {
                page: res.page,
                results: res.results.map(item => {
                    return {
                        id: item.id,
                        title: item.title,
                        image: `${this.imgBaseUrl}/w200${item.poster_path}`,
                        releaseYear: new Date(item.release_date).getFullYear().toString()
                    }
                }),
                total_pages: res.total_pages,
                total_results: res.total_results
            }
            return searchResult;
        })
    }

    getTopRatedMovies = async (page: number): Promise<SearchResult> => {
        return this.api.getTopRatedMovies(page).then(res => {
            let searchResult: SearchResult = {
                page: res.page,
                results: res.results.map(item => {
                    return {
                        id: item.id,
                        title: item.title,
                        image: `${this.imgBaseUrl}/w200${item.poster_path}`,
                        releaseYear: new Date(item.release_date).getFullYear().toString()
                    }
                }),
                total_pages: res.total_pages,
                total_results: res.total_results
            }
            return searchResult;
        })
    }
    getGenrelist = async (): Promise<Genre[]> => {

        return this.api.getGenreList().then(res => {
            let data: Genre[] = res.map(item => {
                return {
                    id: item.id,
                    name: item.name

                }
            })
            return data;
        })
    }

    getMovieByGenre = async (genre: number, page: number): Promise<SearchResult> => {

        return this.api.getMovieByGenre(genre, page).then(res => {
            // let data: MovieSummary[] = res.map(item => {
            //     return {
            //         id: item.id,
            //         title: item.title,
            //         image: `${this.imgBaseUrl}/w500${item.poster_path}`,
            //         releaseYear: new Date(item.release_date).getFullYear().toString()
            //     }
            // })
            // return data;
            let searchResult: SearchResult = {
                page: res.page,
                results: res.results.map(item => {
                    return {
                        id: item.id,
                        title: item.title,
                        image: `${this.imgBaseUrl}/w500${item.poster_path}`,
                        releaseYear: new Date(item.release_date).getFullYear().toString()
                    }
                }),
                total_pages: res.total_pages,
                total_results: res.total_results
            }
            return searchResult;
        })
    }

    getMovieDetailById = async (movieId: number): Promise<MovieDetail> => {

        return this.api.getMovieDetailById(movieId).then(res => {
            let data: MovieDetail ={
                    id: res.id,
                    original_title: res.original_title,
                    poster_path: `${this.imgBaseUrl}/w500${res.poster_path}`,
                    release_date: new Date(res.release_date).getFullYear().toString(),
                    genres: res.genres.map(res=> {
                        return {
                            id: res.id,
                            name: res.name
                        }
                    }),
                    runtime: convertMinutesToHoursMinutes(res.runtime),
                    overview: res.overview,
                    original_language: res.original_language,
                    production_companies: res.production_companies.map(item=> {
                        return {
                            id: item.id,
                            name: item.name,
                            logo_path: `${this.imgBaseUrl}/w92${item.logo_path}`,
                        }
                    }),
                    vote_average: Number(res.vote_average.toFixed(1)),
                    videoUrl: `https://www.youtube.com/watch?v=${res.videos.results[0].key }`
                  
                }
            return data;
        })
    }

    getRecommendedMovies = async (movieId: number): Promise<MovieSummary[]> => {

        return this.api.getRecommendedMovies(movieId).then(res => {
            let data: MovieSummary[] = res.map(item => {
                return {
                    id: item.id,
                    title: item.title,
                    image: `${this.imgBaseUrl}/w200${item.poster_path}`,
                    releaseYear: new Date(item.release_date).getFullYear().toString()
                }
            })
            return data;
        })
    }

    getRelatedImages = async (movieId: number): Promise<MovieImage[]> => {

        return this.api.getRelatedImages(movieId).then(res => {
            let data: MovieImage[] = res.map(item => {
                return {                    
                    file_path: `${this.imgBaseUrl}/w780${item.file_path}`,
                }
            })
            return data;
        })
    }

    searchMovieByQuery = async (query: string, page: number): Promise<SearchResult> => {

        return this.api.searchMovieByQuery(query, page).then(res => {
            let searchResult: SearchResult = {
                page: res.page,
                results: res.results.map(item => {
                    return {
                        id: item.id,
                        title: item.title,
                        image: `${this.imgBaseUrl}/w200${item.poster_path}`,
                        releaseYear: new Date(item.release_date).getFullYear().toString()
                    }
                }),
                total_pages: res.total_pages,
                total_results: res.total_results
            }
            return searchResult;
        })
    }

    discoverMovies = async ( page: number, sortedBy: string, genre: number): Promise<SearchResult> => {

        return this.api.discoverMovies( page, sortedBy, genre).then(res => {
            let searchResult: SearchResult = {
                page: res.page,
                results: res.results.map(item => {
                    return {
                        id: item.id,
                        title: item.title,
                        image: `${this.imgBaseUrl}/w200${item.poster_path}`,
                        releaseYear: new Date(item.release_date).getFullYear().toString()
                    }
                }),
                total_pages: res.total_pages,
                total_results: res.total_results
            }
            return searchResult;
        })
    }
}
function convertMinutesToHoursMinutes(minutes: number) {
    const hours = Math.floor(minutes / 60); // Get the number of full hours
    const remainingMinutes = minutes % 60;  // Get the remaining minutes
    return `${hours}h ${remainingMinutes}m`;
  }