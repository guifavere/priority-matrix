<?php

use Rector\Config\RectorConfig;
use Rector\Set\ValueObject\SetList;

return RectorConfig::configure()
    ->withPaths([
        __DIR__.'/app',
        __DIR__.'/config',
        __DIR__.'/database',
        __DIR__.'/routes',
        __DIR__.'/tests',
    ])
    ->withSkip(([
        __DIR__.'/database/migrations',
    ]))
    ->withRules([])
    ->withSets([
        SetList::PHP_83,
    ])
    ->withPreparedSets(
        codeQuality: true,
        deadCode: true,
        earlyReturn: true,
        privatization: true,
        strictBooleans: true,
    )
    ->withImportNames(importNames: false, removeUnusedImports: true);
