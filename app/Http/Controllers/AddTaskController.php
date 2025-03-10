<?php

namespace App\Http\Controllers;

use App\Enums\Priority;
use App\Http\Requests\AddTaskRequest;
use App\Models\Task;

final class AddTaskController extends Controller
{
    public function __invoke(AddTaskRequest $request)
    {
        Task::create([
            'priority' => $request->priority,
            'title' => $request->title,
            'order' => Task::nextOrderFor(Priority::from($request->priority)),
        ]);
    }
}
