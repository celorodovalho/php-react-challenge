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
        Route::get('movies/show/{id}', 'MoviesController@show');
        Route::any('movies/search/{page?}', 'MoviesController@search');
    });
});
