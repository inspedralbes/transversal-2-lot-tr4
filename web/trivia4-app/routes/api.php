<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\StoreGamesController;
use App\Http\Controllers\Api\GetGamesController;
use App\Http\Controllers\Api\StorePlayersController;
use App\Http\Controllers\Api\GetDadesPlayerController;
use App\Http\Controllers\Api\StoreGameXPlayerController;
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

Route::post('/getDadesPlayer', [GetDadesPlayerController::class, 'send']);

Route::post('/storeGameXPlayer', [StoreGameXPlayerController::class, 'store']);

Route::get('/getPartidesUsuari/{id}', [GetGamesController::class, 'get']);