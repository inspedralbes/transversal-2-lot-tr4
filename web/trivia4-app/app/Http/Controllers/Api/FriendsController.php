<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Friend;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class FriendsController extends Controller
{
    public function sendFriendRequest(Request $request)
    {
        $friend = new Friend;
        $friend->id_requester = $request->id_requester;
        $friend->id_requested = $request->id_requested;
        $friend->pending = true;
        $friend->accepted = false;
        $friend->save();
    }

    public function getPendingRequests($id)
    {
        $friend = Friend::where([
            ['id_requested', '=', $id],
            ['pending', '=', true]
        ])->get();

        if ($friend != null) {
            return $friend;
        }
    }

    public function endFriendRequest(Request $request)
    {
        $friend = Friend::where('id', $request->id)->firstOrFail();
        $friend->pending = false;
        if ($request->accept == "true") {
            $friend->accepted = true;
        } else {
            $friend->accepted = false;
        }

        $friend->save();
        return "200";
    }

    public function dadesAmics($id)
    {
        $users = DB::table('friends')
            ->leftJoin('players', function ($join) {
                $join->on('friends.id_requester', '=', 'players.id')
                    ->orOn('friends.id_requested', '=', 'players.id');
            })
            ->where([
                ['id_requested', '=', $id],
                ['accepted', '=', true]
            ])
            ->where([
                ['id_requester', '=', $id],
                ['accepted', '=', true]
            ])
            ->select('friends.*', 'players.nickname', 'players.id as friend_id')
            ->get();

        return $users;
    }
}
