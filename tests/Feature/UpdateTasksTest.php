<?php

use App\Models\Task;

test('should update tasks', function () {
    $taskA = Task::factory()->create(['order' => 0, 'title' => 'task-a']);
    $taskB = Task::factory()->create(['order' => 10, 'title' => 'task-b']);

    $response = $this->put('/tasks', [
        'tasks' => [
            ['id' => $taskA->id, 'title' => 'updated-task-a'],
            ['id' => $taskB->id, 'order' => 15],
        ],
    ]);

    $response->assertOk();

    $this->assertDatabaseHas('tasks', [
        'id' => $taskA->id,
        'title' => 'updated-task-a',
        'order' => 0,
    ]);

    $this->assertDatabaseHas('tasks', [
        'id' => $taskB->id,
        'title' => 'task-b',
        'order' => 15,
    ]);
});
