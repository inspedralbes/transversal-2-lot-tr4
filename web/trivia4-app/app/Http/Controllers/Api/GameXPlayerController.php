<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\gamexplayer;
use Carbon\Carbon;

class GameXPlayerController extends Controller
{
    public function get($id)
    {
        $game = gamexplayer::where('id_player', $id)->get();
        return json_encode($game);
    }

    public function store(Request $request)
    {
        $game = new gamexplayer();
        $game->id_player = $request->id_player;
        $game->id_game = $request->id_game;
        $game->score = $request->score;
        $game->date = Carbon::now();
        $game->save();
    }

    public function setScorePlayer(Request $request)
    {
        $game = gamexplayer::where(
            ['id_game', $request->id_game],
            ['id_player', $request->id_player]
        )->update(['score' => $request->score]);
    }

    public function getPartides()
    {
        $game = gamexplayer::get();
        return json_encode($game);
    }
}
