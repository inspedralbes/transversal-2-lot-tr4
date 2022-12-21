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

Route::post('/setPlayerData', [PlayersController::class, 'store']);

Route::post('/getPlayerData', [PlayersController::class, 'send']);

Route::get('/getPlayers', [PlayersController::class, 'getAllPlayers']);

Route::get('/getPlayerName/{id}', [PlayersController::class, 'getPlayerName']);

// ---- Dades partida ----

Route::get('/getJSONGame/{id}', [GamesController::class, 'getJSON']);

Route::get('/getJSONGameOfTheDay', [GamesController::class, 'getJSONgotd']);

Route::get('/getIdGameOfTheDay', [GamesController::class, 'getIdGotd']);

Route::post('/setGameData', [GamesController::class, 'store']);

// ---- Dades partida + jugador ----

Route::post('/storeInitialGameXPlayer', [GameXPlayerController::class, 'storeInicial']);

Route::post('/setScorePlayer', [GameXPlayerController::class, 'setScorePlayer']);

Route::get('/getPlayerGames/{id}', [GameXPlayerController::class, 'get']);

Route::get('/getGames', [GameXPlayerController::class, 'getPartides']);

Route::get('/scoresGame/{id}', [GameXPlayerController::class, 'puntuacionsPartida']);

Route::get('/playedGameOfTheDay/{id}', [GameXPlayerController::class, 'haJugatPartidaDelDia']);

Route::get('/totalScoreRank', [GameXPlayerController::class, 'totalScorePlayers']);

// ---- Solicituts d'amistat ----

Route::get('/getPendingRequests/{id}', [FriendsController::class, 'getPendingRequests']);

Route::post('/sendFriendRequest', [FriendsController::class, 'sendFriendRequest']);

Route::post('/resultFriendRequest', [FriendsController::class, 'endFriendRequest']);

Route::get('/friendsData/{id}', [FriendsController::class, 'dadesAmics']);

Route::get('/deleteFriend/{id}', [FriendsController::class, 'esborrarAmic']);

// ---- Questions ----

Route::post('/storeQuestionResult', [QuestionsController::class, 'storeQuestion']);

Route::get('/getQuestionData/{id}', [QuestionsController::class, 'getQuestionData']);
