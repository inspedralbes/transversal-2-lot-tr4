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
        $game->idApi = $request->idApi;
        $game->correcta = $request->correcta;
        $game->save();
    }
}
