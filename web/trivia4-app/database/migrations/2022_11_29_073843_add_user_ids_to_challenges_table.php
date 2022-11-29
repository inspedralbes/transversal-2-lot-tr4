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
                ->on('players')
                ->after('id');

            $table
                ->foreign('challenged')
                ->references('id')
                ->on('players')
                ->after('challenger');
                
            $table
                ->foreign('winner')
                ->references('id')
                ->on('players')
                ->after('challenged');
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
