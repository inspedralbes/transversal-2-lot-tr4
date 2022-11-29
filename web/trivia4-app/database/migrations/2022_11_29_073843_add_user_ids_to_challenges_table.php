<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddUserIdsToChallengesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('challenges', function (Blueprint $table) {
            $table
                ->foreign('challenger')
                ->references('id')
                ->on('players');

            $table
                ->foreign('challenged')
                ->references('id')
                ->on('players');

            $table
                ->foreign('winner')
                ->references('id')
                ->on('players');

            $table
                ->foreign('id_game')
                ->references('id')
                ->on('games');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('challenges', function (Blueprint $table) {
            //
        });
    }
}
