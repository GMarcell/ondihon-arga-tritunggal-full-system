<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ListRequest;
use App\Models\News;
use App\Http\Requests\StoreNewsRequest;
use App\Http\Requests\UpdateNewsRequest;
use App\Http\Resources\NewsResource;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(ListRequest $request)
    {
        return NewsResource::collection(News::query()->where('title', 'LIKE', '%' . $request['search'] . '%')->orderBy('id', 'desc')->paginate($request['per_page'], ['*'], 'page', $request['page']));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreNewsRequest $request)
    {
        $uploadFolder = 'news';
        $image = $request->file('image_link');

        $image_uploaded_path = $image->store($uploadFolder, 'public');

        $news = new News();
        $news->title = $request->title;
        $news->description = $request->description;
        $news->image_link = $image_uploaded_path;
        $news->video_link = $request->video_link;

        $status = $news->save();

        if($status){
            return response('', 204);
        } else {
            return response('Create News Failed', 500);
        }


    }

    /**
     * Display the specified resource.
     */
    public function show(News $news)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateNewsRequest $request, News $news)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(News $news)
    {
        $news->delete();

        return response('', 204);
    }
}
