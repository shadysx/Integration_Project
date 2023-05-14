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
        Schema::create('reservations', function (Blueprint $table) {     
            $table->id();                 
            $table->time('starting_hour');
            $table->time('ending_hour');
            $table->date('date');
            $table->unsignedBigInteger('user1_id');
            $table->unsignedBigInteger('user2_id');
            $table->unsignedBigInteger('user3_id')->nullable();
            $table->unsignedBigInteger('user4_id')->nullable();
            $table->unsignedBigInteger('court_id');          

            $table->unique(['id', 'court_id', 'date', 'starting_hour']);     
                   
            $table->foreign('court_id')->references('id')->on('courts')->onDelete('cascade');
            $table->foreign('user1_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('user2_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('user3_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('user4_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('table_asso_reserve');
    }
};
