<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Game;
use App\Models\Player;
use App\Models\gamexplayer;
use Carbon\Carbon;


class StoreGameXPlayerController extends Controller
{
    public function store(Request $request)
    {
        $game = new gamexplayer();
        $game->id_player = $request->id_player;
        $game->id_game = $request->id_game;
        $game->score = $request->score;
        $game->date = Carbon::now();
        $game->save();
    }
}
