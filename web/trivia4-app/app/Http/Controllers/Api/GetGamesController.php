<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\gamexplayer;

class GetGamesController extends Controller
{
    public function get($id)
    {
        $game = gamexplayer::where('id_player', $id)->get();
        return json_encode($game);
    }
}
