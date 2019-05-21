<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Tmdb\Laravel\Facades\Tmdb;
use Tmdb\Repository\GenreRepository;
use Tmdb\Repository\SearchRepository;

class MoviesController extends Controller
{
    /**
     * @var GenreRepository
     */
    private $genreRepository;

    /**
     * @var SearchRepository
     */
    private $searchRepository;

    /**
     * MoviesController constructor.
     * @param GenreRepository $genreRepository
     */
    public function __construct(GenreRepository $genreRepository, SearchRepository $searchRepository)
    {
        $this->genreRepository = $genreRepository;
        $this->searchRepository = $searchRepository;
    }

    public function upcoming($page = 1)
    {
        $movies = Tmdb::getMoviesApi()->getUpcoming(['page' => $page]);
        $movies['results'] = $this->fillGenres($movies['results']);
        return $movies;
    }

    public function show($id)
    {
        return Tmdb::getMoviesApi()->getMovie($id, ['append_to_response' => 'credits']);
    }

    public function search($page = 1)
    {
        dump(5);die;
        $this->searchRepository->searchMovie();
    }

    private function fillGenres($movies)
    {
        foreach ($movies as $key => $movie) {
            /** Genres */
            if (array_key_exists('genre_ids', $movie)) {
                $genres = [];
                foreach ($movie['genre_ids'] as $genreId) {
                    $genres[] = $this->genreRepository->load($genreId)->getName();
                }
                $movie['genres'] = $genres;
            }

            $movies[$key] = $movie;
        }
        return $movies;
    }
}
