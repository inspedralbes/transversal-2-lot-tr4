<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Friend;
use Carbon\Carbon;

class FriendsController extends Controller
{
    public function sendFriendRequest(Request $request)
    {
        $friend = new Friend;
        $friend->id_requester = $request->id_requester;
        $friend->id_requested = $request->id_requested;
        $friend->pending = true;
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
        } else {
            return false;
        }
    }

    public function endFriendRequest(Request $request)
    {
        $friend = Friend::where('id', $request->id)->firstOrFail();
        $friend->pending = false;
        if ($request->accept == true) {
            $friend->accepted = Carbon::now();
        } else {
            $friend->cancelled = Carbon::now();
        }
        $friend->save();
    }
}
