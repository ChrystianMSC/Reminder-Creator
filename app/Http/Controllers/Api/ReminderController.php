<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreReminderRequest;
use App\Http\Requests\UpdateReminderRequest;
use App\Http\Resources\ReminderResource;
use App\Models\Reminder;
class ReminderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return ReminderResource::collection(Reminder::query()->orderBy('date', 'asc')->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \App\Http\Requests\StoreReminderRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreReminderRequest $request)
    {
        $attributes = $request->validated();
        $reminder = Reminder::create($attributes);
        return response(new ReminderResource($reminder) , 201);
    }


    /**
     * Display the specified resource.
     *
     * @param \App\Models\Reminder $reminder
     * @return \Illuminate\Http\Response
     */
    public function show(Reminder $reminder)
    {
        return new ReminderResource($reminder);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\UpdateReminderRequest $request
     * @param \App\Models\Reminder                     $reminder
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateReminderRequest $request, Reminder $reminder)
    {
        $data = $request->validated();
        $reminder->update($data);

        return new ReminderResource($reminder);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Reminder $reminder
     * @return \Illuminate\Http\Response
     */
    public function destroy(Reminder $reminder)
    {
        $reminder->delete();

        return response("", 204);
    }
}
