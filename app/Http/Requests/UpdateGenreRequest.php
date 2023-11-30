<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateGenreRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255|unique:genres,name,',
        ];
    }

    public function messages()
    {
        return [
            'name.required'=> 'Genre cannot be empty',
            'name.string' => 'Wrong primitive type.',
            'name.max' => 'The name mut have at most 255 characters',
            'name.unique' => 'The genre name is already in use. Please choose a different name.',
        ];
    }
}
