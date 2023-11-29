<?php

use App\Models\Author;
use App\Models\Genre;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
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

        Schema::create('authors', function (Blueprint $table) {
            $table->id();
            $table->text('name');
            $table->text('biography');
            $table->text('normalized_name')->storedAs('UPPER(f_unaccent(name))')->unique();
            $table->text('last_name')->storedAs('split_part(upper(f_unaccent(name)), \' \', -1)');
            $table->date('birth_date');
            $table->timestamps();
        });

        Schema::create('genres', function (Blueprint $table) {
            $table->id();
            $table->text('name');
            $table->text('normalized_name')->storedAs('upper(f_unaccent(name))')->unique();
            $table->timestamps();
        });

        Schema::create('files', function (Blueprint $table) {
            $table->id();
            $table->text('name');
            $table->text('file_name');
            $table->text('mime_type');
            $table->text('path');
            $table->text('file_hash');
            $table->text('disk');
            $table->text('extension');
            $table->text('size');
            $table->timestamps();
        });

        Schema::create('publishers', function (Blueprint $table) {
            $table->id();
            $table->text('name');
            $table->text('normalized_name')->storedAs('upper(f_unaccent(name))')->unique();
            $table->timestamps();
        });

        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->text('title');
            $table->text('description');
            $table->char('rating');
            $table->char('isbn', 13)->unique(); // https://en.wikipedia.org/wiki/ISBN
            $table->foreignIdFor(Author::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Genre::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Publisher::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(\App\Models\File::class, 'cover_id')->nullable()->constrained('files');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('books');
        Schema::dropIfExists('authors');
        Schema::dropIfExists('genres');
        Schema::dropIfExists('publishers');
        Schema::dropIfExists('files');

        \DB::unprepared('DROP FUNCTION IF EXISTS public.f_unaccent(text);');
        \DB::unprepared('DROP FUNCTION IF EXISTS public.immutable_unaccent(regdictionary, text);');
        \DB::unprepared('DROP EXTENSION IF EXISTS "unaccent";');
    }
};
