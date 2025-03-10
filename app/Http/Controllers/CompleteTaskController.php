<?php

namespace App\Http\Controllers;

use App\Models\Task;

final class CompleteTaskController extends Controller
{
    public function __invoke(Task $task): void
    {
        $task->update(['completed_at' => now()]);
    }
}
