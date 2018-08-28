<?php

namespace App\Http\Controllers\Api;

use App\Models\Conversation;
use App\Transformers\ConversationTransformer;
use App\Http\Requests\StoreConversationUserRequest;
use App\Http\Controllers\Controller;

class ConversationUserController extends Controller
{
    public function store(StoreConversationUserRequest $request, Conversation $conversation)
    {
        $this->authorize('affect', $conversation);

        $conversation->users()->syncWithoutDetaching($request->contacts);

        $conversation->load('users');
        return fractal()
            ->item($conversation)
            ->parseIncludes(['user', 'users'])
            ->transformWith(new ConversationTransformer())
            ->toArray();
    }
}
