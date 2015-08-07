<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class EditDatasetTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Add title and description columns and make id unsigned
        Schema::table("datasets", function (Blueprint $table) {
            $table -> increments("id") -> unsigned() -> change();
            $table -> string("title") -> after("id");
            $table -> text("description") -> nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Drop columns title and description and remove unsigned from id
        Schema::table("datasets", function (Blueprint $table) {
            $table -> increments("id") -> change();
            $table -> dropColumn(['title', 'description']);
        });
    }
}
