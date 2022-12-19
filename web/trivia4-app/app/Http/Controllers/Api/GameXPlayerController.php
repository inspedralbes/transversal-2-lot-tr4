<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\gamexplayer;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class GameXPlayerController extends Controller
{
    public function get($id)
    {
        $game = gamexplayer::where('id_player', $id)->get();
        return json_encode($game);
    }

    public function storeInicial(Request $request)
    {
        $game = new gamexplayer();
        $game->id_player = $request->id_player;
        $game->id_game = $request->id_game;
        $game->score = 0;
        $game->date = Carbon::now();
        $game->save();
    }

    public function setScorePlayer(Request $request)
    {
        gamexplayer::where([
            ['id_game', '=', $request->id_game],
            ['id_player', '=', $request->id_player]
        ])->update(['score' => $request->score]);
    }

    public function getPartides()
    {
        $games = gamexplayer::get();
        return json_encode($games);
    }

    public function puntuacionsPartida($id)
    {
        $games = gamexplayer::where('id_game', '=', $id)
            ->join('players', 'gamexplayers.id_player', '=', 'players.id')
            ->orderBy('gamexplayers.score', 'desc')
            ->select("gamexplayers.id_player", "players.nickname", 'gamexplayers.score', 'gamexplayers.date')
            ->get();
        return $games;
    }

    public function haJugatPartidaDelDia($id)
    {
        $idGotd = DB::select(DB::raw("SELECT games.id FROM games WHERE games.gameOfTheDay=1 ORDER BY games.created_at DESC LIMIT 1"));
        $gamexplayer = DB::table('gamexplayers')
            ->where([
                ['id_player', '=', $id],
                ['id_game', '=', $idGotd[0]->id]
            ]);

        if ($gamexplayer->exists()) {
            $response = true;
        } else {
            $response = false;
        }
        return response()->json($response, 200);
    }
}
