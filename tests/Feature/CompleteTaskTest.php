<?php

use App\Models\Task;

test('cannot complete a task that does not exist', function () {
    $this->patch('/tasks/1/complete')->assertNotFound();
});

test('cannot complete a task that is already completed', function () {
    $completedTask = Task::factory()->completed()->create();

    $this->patch("/tasks/abs/complete/{$completedTask->id}")->assertNotfound();
});

test('should complete a non completed task', function () {
    now()->setTestNow('2021-01-01 11:20:30');

    $noCompletedTask = Task::factory()->notCompleted()->create();

    $this->patch("/tasks/{$noCompletedTask->id}/complete")->assertOk();

    $this->assertDatabaseHas('tasks', [
        'id' => $noCompletedTask->id,
        'completed_at' => '2021-01-01 11:20:30',
    ]);
});
