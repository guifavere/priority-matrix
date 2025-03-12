<?php

namespace App\Models;

use App\Enums\Priority;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    /** @use HasFactory<\Database\Factories\TaskFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'priority',
        'title',
        'order',
        'completed_at',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'priority' => Priority::class,
            'completed_at' => 'timestamp',
            'order' => 'integer',
        ];
    }

    public static function nextOrderFor(Priority $priority): int
    {
        $lastOrder = Task::query()->where('priority', $priority)->max('order');

        return is_null($lastOrder) ? 0 : $lastOrder + 1;
    }

    public function scopeNotCompleted(Builder $query): void
    {
        $query->whereNull('completed_at');
    }
}
