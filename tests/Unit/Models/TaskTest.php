<?php

use App\Enums\Priority;
use App\Models\Task;

test('should retrive the next order number for a task', function (Priority $priority, int $expectedOrder) {
    expect(Task::nextOrderFor($priority))->toBe($expectedOrder);
})->with([
    'important-urgent' => [Priority::IMPORTANT_URGENT, 0],
    'important-not-urgent' => function () {
        Task::factory()->create(['priority' => Priority::IMPORTANT_NOT_URGENT, 'order' => 0]);

        return [Priority::IMPORTANT_NOT_URGENT, 1];
    },
    'not-important-urgent' => function () {
        Task::factory()->create(['priority' => Priority::NOT_IMPORTANT_URGENT, 'order' => 5]);

        return [Priority::NOT_IMPORTANT_URGENT, 6];
    },
]);
