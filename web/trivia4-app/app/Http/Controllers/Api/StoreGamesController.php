<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use app\Models\Game;

class StoreGamesController extends Controller
{
    public function store(Request $request)
    {
        $game = new Game;
        $game->game_info = $request->json;
        $game->save();
    }
}
