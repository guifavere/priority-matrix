<?php

namespace Database\Seeders;

use App\Enums\Priority;
use App\Models\Task;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Task::factory()->create(['priority' => Priority::IMPORTANT_URGENT, 'title' => 'buy a book', 'order' => 0]);
        Task::factory()->create(['priority' => Priority::IMPORTANT_NOT_URGENT, 'title' => 'go to gym', 'order' => 0]);
        Task::factory()->create(['priority' => Priority::NOT_IMPORTANT_URGENT, 'title' => 'call mom', 'order' => 0]);
        Task::factory()->create(['priority' => Priority::NOT_IMPORTANT_NOT_URGENT, 'title' => 'watch a movie', 'order' => 0]);
    }
}
