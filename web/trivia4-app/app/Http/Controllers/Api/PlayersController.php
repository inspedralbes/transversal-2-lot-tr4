<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Player;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use Illuminate\Database\QueryException;

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

        try {
            if ($player->save()) {
                $message = "Registered correctly.";
                return response()->json([$message, 200]);
            }
        } catch (QueryException $ex) {
            $message = "Couldn't register.";
            return response()->json([$message, 500]);
        }
    }

    public function send(Request $request)
    {
        try {
            $player = Player::where('nickname', $request->nickname)->firstOrFail();
            if ($player != null) {
                if (Hash::check($request->psswd, $player->psswd)) {
                    return response()->json([
                        $player,
                        200
                    ]);
                } else {
                    $message = "Incorrect password!";
                    return response()->json([
                        $message,
                        500
                    ]);
                }
            }
        } catch (\Throwable $th) {
            $message = "This player doesn't exist!";
            return response()->json([
                $message,
                500
            ]);
        }
    }

    public function getAllPlayers()
    {
        $players = Player::get();
        return json_encode($players);
    }

    public function getPlayerName($id)
    {
        $player = Player::where('id', $id)->firstOrFail();
        return $player->nickname;
    }
}
