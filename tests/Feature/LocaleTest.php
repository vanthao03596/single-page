<?php

namespace Tests\Feature;

use Tests\TestCase;

class LocaleTest extends TestCase
{
    /** @test */
    public function set_locale_from_header()
    {
        $this->withHeaders(['Accept-Language' => 'VI'])
            ->postJson('/api/login');

        $this->assertEquals('vi', $this->app->getLocale());
    }

    /** @test */
    public function set_locale_from_header_short()
    {
        $this->withHeaders(['Accept-Language' => 'en-US'])
            ->postJson('/api/login');

        $this->assertEquals('en', $this->app->getLocale());
    }
}
