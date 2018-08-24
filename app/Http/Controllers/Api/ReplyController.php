<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Transformers\ConversationTransformer;
use App\Models\Conversation;
use App\Http\Requests\StoreConversationReplyRequest;

class ReplyController extends Controller
{
    public function store(StoreConversationReplyRequest $request, Conversation $conversation)
    {
        $reply = new Conversation;
        $reply->body = $request->body;
        $reply->user()->associate($request->user());

        $conversation->replies()->save($reply);
        $conversation->touchLastReply();

        return fractal()
            ->item($reply)
            ->parseIncludes(['user', 'parent', 'parent.user', 'parent.users'])
            ->transformWith(new ConversationTransformer())
            ->toArray();
    }
}
