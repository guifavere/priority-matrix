<?php

namespace App\Http\Requests;

use App\Models\Task;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTasksRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'tasks' => ['required', 'array'],
            'tasks.*.id' => [
                'required',
                'integer',
                'distinct',
                Rule::exists('tasks', 'id')->where(fn () => Task::query()->notCompleted()),
            ],
            'tasks.*.title' => ['sometimes', 'required', 'string', 'min:1', 'max:255'],
            'tasks.*.order' => ['sometimes', 'required', 'integer', 'min:0', 'distinct'],
        ];
    }
}
