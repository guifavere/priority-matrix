<?php

use App\Enums\Priority;

test('should add a new task', function () {
    $response = $this->post('/tasks', [
        'priority' => Priority::NOT_IMPORTANT_NOT_URGENT->value,
        'title' => 'new-task-10',
    ]);

    $response->assertOk();

    $this->assertDatabaseHas('tasks', [
        'priority' => Priority::NOT_IMPORTANT_NOT_URGENT,
        'title' => 'new-task-10',
        'order' => 0,
    ]);
});
