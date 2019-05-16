<?php

namespace App\Http\Controllers\Api;

use Tmdb\Laravel\Facades\Tmdb;


use App\Http\Controllers\Controller;

class MoviesController extends Controller
{
    public function upcoming()
    {
        return Tmdb::getMoviesApi()->getUpcoming();
    }
}
