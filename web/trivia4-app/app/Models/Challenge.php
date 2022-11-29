<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use app\Models\Player;

class Challenge extends Model
{
    use HasFactory;

    public function players(){
        return $this->hasMany(Player::class);
    }
}
