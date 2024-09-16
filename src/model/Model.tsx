
export interface MovieSummary{
    id: string;
    title: string;
    image: string;
    releaseYear: string;
}

export interface Genre{
    id: number;
    name: string;
}

export interface MovieDetail{
    id: string;
    original_title: string;
    poster_path: string;
    release_date: string;
    genres: Genre[];
    runtime: string;
    overview: string;
    original_language: string;
    production_companies: Company[];
    vote_average: number;
    videoUrl: string;
}

export interface Company{
    id: number;
    name: string;
    logo_path: string;
}

export interface MovieImage{
    file_path: string;
}

export interface SearchResult{
    page: number;
    results: MovieSummary[];
    total_pages: number;
    total_results: number;
}

