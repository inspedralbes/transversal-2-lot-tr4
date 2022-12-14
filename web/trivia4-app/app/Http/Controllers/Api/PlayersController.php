<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Player;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class PlayersController extends Controller
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

    public function send(Request $request)
    {
        $player = Player::where('nickname', $request->nickname)->firstOrFail();
        if ($player != null) {
            if (Hash::check($request->psswd, $player->psswd)) {
                $correcte = true;
                return response()->json([
                    $correcte,
                    $player
                ]);
            } else {
                $correcte = false;
                $message = "Contrasenya incorrecta";
                return response()->json([
                    $correcte,
                    $message
                ]);
            }
        }
    }

    public function getAllPlayers()
    {
        $players = Player::get();
        return json_encode($players);
    }
}
