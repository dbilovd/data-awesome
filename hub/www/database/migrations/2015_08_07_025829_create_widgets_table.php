<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateWidgetsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Create widgets table
        Schema::create("widgets", function($table) {

            $table -> increments("id") -> unsigned();
            $table -> integer("dataset");
            $table -> string("image");
            $table -> text("query");
            $table -> timestamps();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Drop widgets table
        Schema::dropIfExists("widgets");
    }
}
