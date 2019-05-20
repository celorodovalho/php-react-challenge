<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::namespace('Api')->group(function () {
    Route::middleware('api', 'cors')->group(function ($router) {
        Route::any('movies/upcoming/{page?}', 'MoviesController@upcoming');
        Route::get('movies/show/{id}', 'MoviesController@show');
    });
});
