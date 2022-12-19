<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\GamesController;
use App\Http\Controllers\Api\PlayersController;
use App\Http\Controllers\Api\GameXPlayerController;
use App\Http\Controllers\Api\FriendsController;
use App\Http\Controllers\Api\QuestionsController;

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

Route::get('/getIdPartidaDelDia', [GamesController::class, 'getIdGotd']);

Route::post('/setDadesPartida', [GamesController::class, 'store']);

// ---- Dades partida + jugador ----

Route::post('/storeGameXPlayerInicial', [GameXPlayerController::class, 'storeInicial']);

Route::post('/setScorePlayer', [GameXPlayerController::class, 'setScorePlayer']);

Route::get('/getPartidesUsuari/{id}', [GameXPlayerController::class, 'get']);

Route::get('/getPartides', [GameXPlayerController::class, 'getPartides']);

Route::get('/puntuacionsPartida/{id}', [GameXPlayerController::class, 'puntuacionsPartida']);

Route::get('/haJugatPartidaDelDia/{id}', [GameXPlayerController::class, 'haJugatPartidaDelDia']);

// ---- Solicituts d'amistat ----

Route::get('/getSolicitutsPendents/{id}', [FriendsController::class, 'getPendingRequests']);

Route::post('/mandarSolicitutAmistat', [FriendsController::class, 'sendFriendRequest']);

Route::post('/resultatSolicitutAmistat', [FriendsController::class, 'endFriendRequest']);

Route::get('/dadesAmics/{id}', [FriendsController::class, 'dadesAmics']);

Route::get('/esborrarAmic/{id}', [FriendsController::class, 'esborrarAmic']);

// ---- Questions ----

Route::post('/storeResultatPregunta', [QuestionsController::class, 'storeQuestion']);

Route::get('/getDadesPregunta/{id}', [QuestionsController::class, 'getQuestionData']);
