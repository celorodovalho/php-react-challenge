<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Tmdb\Laravel\Facades\Tmdb;
use Tmdb\Repository\GenreRepository;

/**
 * Class MoviesController
 * @package App\Http\Controllers\Api
 */
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

    /**
     * Retrieves the Movie by ID
     *
     * @param int $id
     * @return mixed
     */
    public function show($id)
    {
        return Tmdb::getMoviesApi()->getMovie($id, ['append_to_response' => 'credits']);
    }

    /**
     * Fetch all upcoming Movies when no search is provided
     *
     * @param Request $request
     * @param int $page
     * @return mixed
     */
    public function search(Request $request, $page = 1)
    {
        $query = $request->post('query');

        if (null === $query) {
            $movies = Tmdb::getMoviesApi()->getUpcoming(['page' => $page]);
        } else {
            $movies = Tmdb::getSearchApi()->searchMovies($query, ['page' => $page]);
        }

        $movies['results'] = $this->fillGenres($movies['results']);
        return $movies;
    }

    /**
     * Fill up all the movies results with genre names
     *
     * @param $movies
     * @return mixed
     */
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
