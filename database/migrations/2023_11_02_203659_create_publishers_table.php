<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Publisher;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        \DB::unprepared('CREATE EXTENSION IF NOT EXISTS "unaccent";');
        \DB::unprepared(<<<QUERY
CREATE OR REPLACE FUNCTION public.immutable_unaccent(regdictionary, text)
  RETURNS text
  LANGUAGE c IMMUTABLE PARALLEL SAFE STRICT AS
'\$libdir/unaccent', 'unaccent_dict';
QUERY);
        \DB::unprepared(<<<QUERY
CREATE OR REPLACE FUNCTION public.f_unaccent(text)
  RETURNS text
  LANGUAGE sql IMMUTABLE PARALLEL SAFE STRICT
RETURN public.immutable_unaccent(regdictionary 'public.unaccent', $1);
QUERY);
        Schema::create('publishers', function (Blueprint $table) {
            $table->id();
            $table->text('name');
            $table->text('normalized_name')->storedAs('UPPER(f_unaccent(name))')->unique();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('publishers');

        \DB::unprepared('DROP FUNCTION IF EXISTS public.f_unaccent(text);');
        \DB::unprepared('DROP FUNCTION IF EXISTS public.immutable_unaccent(regdictionary, text);');
        \DB::unprepared('DROP EXTENSION IF EXISTS "unaccent";');
    }
};
