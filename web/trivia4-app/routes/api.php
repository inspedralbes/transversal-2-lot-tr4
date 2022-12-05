<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\StoreGamesController;
use App\Http\Controllers\Api\GetGamesController;
use App\Http\Controllers\Api\StorePlayersController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/setDadesPartida', [StoreGamesController::class, 'store']);

Route::post('/setDadesPlayer', [StorePlayersController::class, 'store']);

Route::get('/getPartides', [GetGamesController::class, 'get']);