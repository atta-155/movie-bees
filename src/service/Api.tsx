import React from "react";
import { MovieSummary, SearchResult} from "../model/Model";
import {  GenreDTO, MovieDetailDTO, MovieImageDTO, MovieSummaryDTO, SearchResultDTO } from "../model/RestModel";
// import { Track } from "../models/ViewModel";
// import { AlbumDTO, TrackDTO } from "../models/RestModel";

interface ApiProps {
    baseUrl: string;
}

export default class Api extends React.Component<ApiProps> {
    constructor(props: ApiProps) {
        super(props);
    }
    apikey = process.env.REACT_APP_API_KEY;

    options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer '+ this.apikey
        }
    };
     
    getTrendingMovies = async (): Promise<MovieSummaryDTO[]> => {
        const url = this.props.baseUrl + "/trending/movie/week?language=en-US";
         
        try {
            const response = await fetch(url, this.options);
            const data= await response.json();
            const movieList: MovieSummaryDTO[] = data.results.slice(0,8);
            return movieList;           

        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    
    getGenreList = async (): Promise<GenreDTO[]> => {
        const url = this.props.baseUrl + "/genre/movie/list";

         
        try {
            const response = await fetch(url, this.options);
            const data= await response.json();
            const genreList: GenreDTO[] = data.genres.slice(0,9);
            return genreList;           

        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    getMovieByGenre = async (genre: number): Promise<MovieSummaryDTO[]> => {
        let url = "";
        if(genre == 0){
            url = this.props.baseUrl + "/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
        }else{
            url = this.props.baseUrl + "/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres="+ genre;
        }

        try {
            const response = await fetch(url, this.options);
            const data= await response.json();
            const movieList: MovieSummaryDTO[] = data.results.slice(0,16);
            return movieList;           

        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    getMovieDetailById = async (movieId: number): Promise<MovieDetailDTO> => {
        const url = this.props.baseUrl + "/movie/"+ movieId+ '?language=en-US';
         
        try {
            const response = await fetch(url, this.options);
            const data: MovieDetailDTO= await response.json();
            return data;           

        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    getRecommendedMovies = async (movieId: number): Promise<MovieSummaryDTO[]> => {
        let url = this.props.baseUrl + "/movie/"+ movieId + '/recommendations?language=en-US&page=1';

        try {
            const response = await fetch(url, this.options);
            const data= await response.json();
            const movieList: MovieSummaryDTO[] = data.results.slice(0,10);
            return movieList;           

        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    getRelatedImages = async (movieId: number): Promise<MovieImageDTO[]> => {
        let url = this.props.baseUrl + "/movie/"+ movieId + '/images';

        try {
            const response = await fetch(url, this.options);
            const data= await response.json();
            const imgList: MovieImageDTO[] = data.backdrops.slice(0,8);
            return imgList;           

        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    searchMovieByQuery = async (query: string, page: number): Promise<SearchResultDTO> => {
        let url = this.props.baseUrl + "/search/movie?query="+ query +"&include_adult=false&language=en-US&page="+ page;

        try {
            const response = await fetch(url, this.options);
            const data: SearchResultDTO= await response.json();
            return data;           

        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };
    
    discoverMovies = async ( page: number, sortedBy: string, genre: number): Promise<SearchResultDTO> => {
        let url = "";
        if(genre == 0){
            url = this.props.baseUrl + "/discover/movie?include_adult=false&include_video=false&language=en-US&page="+ page+ "&sort_by="+ sortedBy;
        }else{
            url = this.props.baseUrl + "/discover/movie?include_adult=false&include_video=false&language=en-US&page="+ page+ "&sort_by="+ sortedBy +"&with_genres="+ genre;
        }
        try {
            const response = await fetch(url, this.options);
            const data: SearchResultDTO= await response.json();
            return data;           

        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

}