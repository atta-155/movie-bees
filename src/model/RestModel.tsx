export interface MovieSummaryDTO {
    id: string;
    title: string;
    poster_path: string;
    release_date: string;
}

export interface GenreDTO{
    id: number;
    name: string;
}


export interface MovieDetailDTO{
    id: string;
    original_title: string;
    poster_path: string;
    release_date: string;
    genres: GenreDTO[];
    runtime: number;
    overview: string;
    original_language: string;
    production_companies: CompanyDTO[];
    vote_average: number;
}

export interface CompanyDTO{
    id: number;
    name: string;
    logo_path: string;
}

export interface MovieImageDTO{
    file_path: string;
}

export interface SearchResultDTO{
    page: number;
    results: MovieSummaryDTO[];
    total_pages: number;
    total_results: number;
}
