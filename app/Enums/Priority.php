<?php

namespace App\Enums;

enum Priority: int
{
    case IMPORTANT_URGENT = 0;

    case IMPORTANT_NOT_URGENT = 1;

    case NOT_IMPORTANT_URGENT = 2;

    case NOT_IMPORTANT_NOT_URGENT = 3;
}
