<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Inertia\Inertia;

final class ShowTasksController extends Controller
{
    public function __invoke()
    {
        $tasks = Task::query()->select(['id', 'priority', 'title'])->notCompleted()->orderBy('order')->limit(40)->get();

        return Inertia::render('Home', ['tasks' => $tasks]);
    }
}
