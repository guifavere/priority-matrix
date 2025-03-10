<?php

namespace Database\Factories;

use App\Enums\Priority;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'priority' => Priority::IMPORTANT_URGENT,
            'title' => $this->faker->sentence,
            'order' => $this->faker->numberBetween(0, 100),
            'completed_at' => null,
        ];
    }

    public function notCompleted(): self
    {
        return $this->state(['completed_at' => null]);
    }

    public function completed(): self
    {
        return $this->state(['completed_at' => now()]);
    }
}
