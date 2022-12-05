<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Player;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class StorePlayersController extends Controller
{
    public function store(Request $request)
    {
        $player = new Player;
        $player->name = $request->name;
        $player->surname = $request->surname;
        $player->nickname = $request->nickname;
        $player->mail = $request->mail;
        $player->psswd = Hash::make($request->psswd);
        $player->created_at = Carbon::now();
        $player->save();
    }
}
