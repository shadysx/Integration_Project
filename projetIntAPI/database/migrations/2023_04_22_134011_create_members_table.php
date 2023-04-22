<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMembersTable extends Migration
{
    public function up()
    {
        Schema::create('members', function (Blueprint $table) {
            $table->string('affiliationNumber', 50)->primary();
            $table->string('lastName', 50);
            $table->string('firstName', 50);
            $table->enum('gender', ['M', 'F']);
            $table->string('ranking', 50);
            $table->date('dateOfBirth');
            $table->string('mobile', 15);
            $table->string('email', 255);
            $table->string('password', 255);
            $table->string('status', 50);
            $table->string('street', 255);
            $table->string('postalCode', 10);
            $table->string('locality', 255);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('members');
    }
}
