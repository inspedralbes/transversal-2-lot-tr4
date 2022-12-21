<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use app\Models\Player;

class PlayerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('players')->insert([
            'name' => 'ausias',
            'surname' => 'ausias',
            'nickname' => 'ausias',
            'mail' => 'ausias@inspedralbes.cat',
            'psswd' => Hash::make('ausias'),
            'created_at' => Carbon::now()
        ]);

        DB::table('players')->insert([
            'name' => 'pedra',
            'surname' => 'pedra',
            'nickname' => 'pedra',
            'mail' => 'pedra@inspedralbes.cat',
            'psswd' => Hash::make('pedra'),
            'created_at' => Carbon::now()
        ]);
    }
}
