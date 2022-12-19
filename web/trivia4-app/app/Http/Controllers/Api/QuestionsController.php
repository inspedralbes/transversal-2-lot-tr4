<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Question;
use Illuminate\Http\Request;

class QuestionsController extends Controller
{
    public function storeQuestion(Request $request)
    {
        $game = new Question;
        $game->id_api = $request->idApi;
        if ($request->correcta == "true") {
            $game->correcta = true;
        } else {
            $game->correcta = false;
        }
        $game->save();
    }
}
