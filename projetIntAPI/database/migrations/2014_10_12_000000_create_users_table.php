<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('affiliationNumber', 50)->unique();
            $table->string('lastName', 50);
            $table->string('firstName', 50);
            $table->enum('gender', ['M','F','O','X']);
            $table->string('ranking', 50);
            $table->date('dateOfBirth');
            $table->string('mobile', 15);
            $table->string('email', 255);
            $table->string('password', 255);
            $table->string('status', 50);
            $table->string('street', 255);
            $table->string('postalCode', 10);
            $table->string('locality', 255);
            $table->boolean('isAdmin')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
