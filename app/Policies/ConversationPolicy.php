<?php

namespace App\Policies;

use App\User;
use App\Models\Conversation;
use Illuminate\Auth\Access\HandlesAuthorization;

class ConversationPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the conversation.
     *
     * @param  \App\User  $user
     * @param  \App\Models\Conversation  $conversation
     * @return mixed
     */
    public function view(User $user, Conversation $conversation)
    {
        return $this->affect($user, $conversation);
    }

    /**
     * Determine whether the user can create conversations.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the conversation.
     *
     * @param  \App\User  $user
     * @param  \App\Models\Conversation  $conversation
     * @return mixed
     */
    public function update(User $user, Conversation $conversation)
    {
        //
    }

    /**
     * Determine whether the user can delete the conversation.
     *
     * @param  \App\User  $user
     * @param  \App\Models\Conversation  $conversation
     * @return mixed
     */
    public function delete(User $user, Conversation $conversation)
    {
        //
    }

    /**
     * Determine whether the user can restore the conversation.
     *
     * @param  \App\User  $user
     * @param  \App\Models\Conversation  $conversation
     * @return mixed
     */
    public function restore(User $user, Conversation $conversation)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the conversation.
     *
     * @param  \App\User  $user
     * @param  \App\Models\Conversation  $conversation
     * @return mixed
     */
    public function forceDelete(User $user, Conversation $conversation)
    {
        //
    }

    public function affect(User $user, Conversation $conversation)
    {
        return $user->isInConversation($conversation);
    }
}
