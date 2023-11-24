<?php

namespace Database\Factories;

use App\Models\Book;
use App\Models\People;
use App\Models\Loan;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Loan>
 */
class LoanFactory extends Factory
{
    protected $model = Loan::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $status = $this->faker->randomElement(["Returned","Borrowed","Delayed"]);
        $return_date = null;
        if($status === "Returned") {
            $return_date = $this->faker->dateTimeBetween('-1 week', 'now');
        };

        return [
            'book_id' => Book::factory(),
            'people_id' => People::factory(),
            'status' => $status,
            'return_date' => $return_date,
        ];
    }
}
