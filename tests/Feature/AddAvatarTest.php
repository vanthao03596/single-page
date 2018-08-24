<?php

namespace Tests\Feature;

use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class AddAvatarTest extends TestCase
{

    /** @test */

    public function only_member_can_add_avatar()
    {
        $this->disableExceptionHandling();
        $this->withExceptionHandling();
        $this->json('POST', 'api/users/1/avatars')
                ->assertStatus(401);
    }
}
