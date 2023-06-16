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
        Schema::create('blockeds', function (Blueprint $table) {     
            $table->id();                 
            $table->time('begin_hour');
            $table->date('date');
            $table->float('duration');
            $table->string('reason');
            $table->unsignedBigInteger('user_id');            
            $table->unsignedBigInteger('court_id');          

            $table->unique(['id', 'court_id', 'begin_hour', 'user_id']);     
                   
            $table->foreign('court_id')->references('id')->on('courts')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }
    
    public function down(): void
    {
        Schema::dropIfExists('table_asso_blocked');
    }
};
