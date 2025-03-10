<?php

use App\Http\Controllers\AddTaskController;
use App\Http\Controllers\CompleteTaskController;
use App\Http\Controllers\ShowTasksController;
use App\Http\Controllers\UpdateTasksController;
use Illuminate\Support\Facades\Route;

Route::get('/', ShowTasksController::class);
Route::post('/tasks', AddTaskController::class);
Route::put('/tasks', UpdateTasksController::class);
Route::patch('/tasks/{notCompletedTask}/complete', CompleteTaskController::class);
