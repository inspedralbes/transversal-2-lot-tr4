<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Api\StoreGamesController;

class GamesController extends Controller
{
    public function gamesInfo(Request $request)
    {
        $json_game = $request->json;

        $req = (new StoreGamesController)->store($json_game);
    }
}
