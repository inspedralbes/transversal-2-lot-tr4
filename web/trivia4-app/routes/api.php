<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\GamesController;
use App\Http\Controllers\Api\PlayersController;
use App\Http\Controllers\Api\GameXPlayerController;
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

Route::post('/setDadesPartida', [GamesController::class, 'store']);

Route::get('/getJSONPartida/{id}', [GamesController::class, 'getJSON']);

Route::get('/getJSONPartidaDelDia', [GamesController::class, 'getJSONgotd']);

Route::post('/setDadesPlayer', [PlayersController::class, 'store']);

Route::post('/getDadesPlayer', [PlayersController::class, 'send']);

Route::post('/storeGameXPlayer', [GameXPlayerController::class, 'store']);

Route::get('/getPartidesUsuari/{id}', [GameXPlayerController::class, 'get']);

Route::get('/getPartides', [GameXPlayerController::class, 'getPartides']);