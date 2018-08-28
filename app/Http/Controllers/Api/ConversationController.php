<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Transformers\ConversationTransformer;
use App\Models\Conversation;
use App\Http\Requests\StoreConversationRequest;
use App\Events\ConversationCreated;

class ConversationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $conversations = $request->user()->conversations()->get();
        return fractal()
            ->collection($conversations)
            ->parseIncludes(['user', 'users'])
            ->transformWith(new ConversationTransformer())
            ->toArray();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request\StoreConversationRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreConversationRequest $request)
    {
        $data = $request->all();
        $data['user_id'] = $request->user()->id;
        $conversation = Conversation::create($data);
        $conversation->touchLastReply();

        $conversation->users()->sync(

            array_unique(
            array_merge($request->contacts, [$request->user()->id])

        )
        );
        $conversation->load('users');
        broadcast(new ConversationCreated($conversation))->toOthers();

        return fractal()
            ->item($conversation)
            ->parseIncludes(['user', 'users', 'replies.user'])
            ->transformWith(new ConversationTransformer())
            ->toArray();
    }


    /**
     * @param Conversation $conversation
     * @return mixed
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function show(Conversation $conversation)
    {
        $this->authorize('view', $conversation);
        if ($conversation->isReply()) {
            abort(404);
        }
        return fractal()
            ->item($conversation)
            ->parseIncludes(['user', 'users', 'replies.user'])
            ->transformWith(new ConversationTransformer())
            ->toArray();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
