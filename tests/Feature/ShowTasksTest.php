<?php

use App\Enums\Priority;
use App\Models\Task;
use Inertia\Testing\AssertableInertia as Assert;

test('cannot show more than 40 tasks', function () {
    Task::factory()->count(50)->notCompleted()->create();

    $this->get('/')
        ->assertInertia(fn (Assert $page) => $page
            ->component('Home')
            ->has('tasks', 40)
        );
});

test('should show the tasks', function () {
    Task::factory()->count(5)->notCompleted()->create();

    $this->get('/')
        ->assertInertia(fn (Assert $page) => $page
            ->component('Home')
            ->has('tasks', 5)
        );
});

test('should show the tasks in the correct order', function () {
    $taskA = Task::factory()->create(['priority' => Priority::IMPORTANT_URGENT, 'order' => 2]);
    $taskB = Task::factory()->create(['priority' => Priority::IMPORTANT_URGENT, 'order' => 1]);
    $taskC = Task::factory()->create(['priority' => Priority::IMPORTANT_URGENT, 'order' => 3]);
    $taskD = Task::factory()->create(['priority' => Priority::IMPORTANT_URGENT, 'order' => 0]);

    $this->get('/')
        ->assertInertia(fn (Assert $page) => $page
            ->component('Home')
            ->has('tasks', 4)
            ->where('tasks.0.id', $taskD->id)
            ->where('tasks.1.id', $taskB->id)
            ->where('tasks.2.id', $taskA->id)
            ->where('tasks.3.id', $taskC->id)
        );
});
