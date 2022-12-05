<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Player;
use Illuminate\Support\Facades\Hash;

class GetDadesPlayerController extends Controller
{
    public function send(Request $request)
    {
        $player = Player::where('nickname', $request->nickname)->firstOrFail();;
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
}
