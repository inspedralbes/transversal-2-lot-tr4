<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use app\Models\Player;
use app\Models\Game;


class gamexplayer extends Model
{
    use HasFactory;
    
    public function players() {
        return $this->hasMany(Player::class);
    }

    public function games() {
        return $this->hasMany(Game::class);
    }
}
