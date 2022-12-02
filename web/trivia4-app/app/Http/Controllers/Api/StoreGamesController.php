<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Game;

class StoreGamesController extends Controller
{
    public function store(Request $request)
    {
        $game = new Game;
        $game->game_info = json_encode($request->json);
        $game->save();
    }
}
