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
        Schema::create('table_asso_category_member', function (Blueprint $table) {
            $table->id();       

            $table->unsignedBigInteger('member_id');
            $table->unsignedBigInteger('category_id');      

            $table->unique(['id', 'member_id', 'category_id']);     
                   
            $table->foreign('member_id')->references('id')->on('members')->onDelete('cascade');
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('table_asso_category_member');
    }
};