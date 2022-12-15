<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\GamesController;
use App\Http\Controllers\Api\PlayersController;
use App\Http\Controllers\Api\GameXPlayerController;
use App\Http\Controllers\Api\FriendsController;

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

// ---- Players ----

Route::post('/setDadesPlayer', [PlayersController::class, 'store']);

Route::post('/getDadesPlayer', [PlayersController::class, 'send']);

Route::get('/getPlayers', [PlayersController::class, 'getAllPlayers']);

Route::get('/getPlayerName/{id}', [PlayersController::class, 'getPlayerName']);

// ---- Dades partida ----

Route::get('/getJSONPartida/{id}', [GamesController::class, 'getJSON']);

Route::get('/getJSONPartidaDelDia', [GamesController::class, 'getJSONgotd']);

Route::post('/setDadesPartida', [GamesController::class, 'store']);

// ---- Dades partida + jugador ----

Route::post('/storeGameXPlayer', [GameXPlayerController::class, 'store']);

Route::get('/getPartidesUsuari/{id}', [GameXPlayerController::class, 'get']);

Route::get('/getPartides', [GameXPlayerController::class, 'getPartides']);

// ---- Solicituts d'amistat ----

Route::get('/getSolicitutsPendents/{id}', [FriendsController::class, 'getPendingRequests']);

Route::post('/mandarSolicitutAmistat', [FriendsController::class, 'sendFriendRequest']);

Route::post('/resultatSolicitutAmistat', [FriendsController::class, 'endFriendRequest']);

Route::get('/dadesAmics', [FriendsController::class, 'dadesAmics']);
