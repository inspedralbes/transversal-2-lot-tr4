<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Game;

class GetGamesController extends Controller
{
    public function get()
    {
        $game = Game::all();
        return json_encode($game);
    }
}
