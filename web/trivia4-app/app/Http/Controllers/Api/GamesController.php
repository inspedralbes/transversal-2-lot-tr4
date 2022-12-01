<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use app\Http\Controllers\Api\StoreGamesController;

class GamesController extends Controller
{
    public function gamesInfo(Request $request)
    {
        $json_game = $request->json;

        (new StoreGamesController)->store($json_game);
    }
}
