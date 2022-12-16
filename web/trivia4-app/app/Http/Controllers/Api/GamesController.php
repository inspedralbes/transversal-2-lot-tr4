<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Game;
use App\Models\gamexplayer;
use Illuminate\Support\Facades\DB;

class GamesController extends Controller
{
    public function store(Request $request)
    {
        $game = new Game;
        $game->difficulty = $request->difficulty;
        $game->category = $request->category;
        $game->game_info = json_encode($request->json);
        $game->gameOfTheDay = false;
        $game->save();
        return $game->id;
    }

    public function getJSON($id)
    {
        $game = Game::where('id', $id)->firstOrFail();
        return $game->game_info;
    }

    public function getJSONgotd()
    {
        $game = Game::where('gameOfTheDay', true)->latest()->first();
        return json_decode($game->game_info);
    }

    public function partidaDelDiaPuntuacions()
    {
        $gameOfTheDayId = Game::where('gameOfTheDay', true)
        ->latest()
        ->first()
        ->select('id_game');

        $game = DB::table('games')
            ->join('gamexplayers', 'games.id', '=', 'gamexplayers.id_game')
            ->where('games.id', '=', $gameOfTheDayId)->latest()->first()
            ->select('games.id', "gamexplayer.id_player", 'gamexplayers.score', 'gamexplayers.date')
            ->get();
        return $game;
    }
}
