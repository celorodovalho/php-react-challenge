<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Tmdb\Laravel\Facades\Tmdb;
use Tmdb\Repository\GenreRepository;

class MoviesController extends Controller
{
    /**
     * @var GenreRepository
     */
    private $genreRepository;

    /**
     * MoviesController constructor.
     * @param GenreRepository $genreRepository
     */
    public function __construct(GenreRepository $genreRepository)
    {
        $this->genreRepository = $genreRepository;
    }

    public function upcoming($page = 1)
    {
        $movies = Tmdb::getMoviesApi()->getUpcoming(['page' => $page]);
        $movies['results'] = $this->fillGenres($movies['results']);
        return $movies;
    }

    public function show($id)
    {
        return Tmdb::getMoviesApi()->getMovie($id);
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
