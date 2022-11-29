<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddUserIdsAndGameIdsToGamexplayersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('gamexplayers', function (Blueprint $table) {
            $table
                ->foreign('id_player')
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
        Schema::table('gamexplayers', function (Blueprint $table) {
            //
        });
    }
}
