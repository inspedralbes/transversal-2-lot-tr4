<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Game;

class GamesController extends Controller
{
    public function store(Request $request)
    {
        $game = new Game;
        $game->difficulty = $request->difficulty;
        $game->category = $request->category;
        $game->game_info = json_encode($request->json);
        $game->save();
        return $game->id;
    }

    public function get($id)
    {
        $game = Game::where('id_game', $id)->get();
        return json_encode($game->game_info);
    }
}
