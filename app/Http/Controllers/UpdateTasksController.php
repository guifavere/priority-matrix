<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateTasksRequest;
use App\Models\Task;
use Illuminate\Support\Arr;

final class UpdateTasksController extends Controller
{
    public function __invoke(UpdateTasksRequest $request)
    {
        foreach ($request->tasks as $task) {
            Task::query()->where('id', $task['id'])->update(Arr::except($task, 'id'));
        }
    }
}
