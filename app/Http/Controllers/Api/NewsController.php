<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ListRequest;
use App\Models\News;
use App\Http\Requests\StoreNewsRequest;
use App\Http\Requests\UpdateNewsRequest;
use App\Http\Resources\NewsResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

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

        if ($status) {
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

    public function deleteNews(Request $request, News $news)
    {
        $data = $news->find($request->id);
        $image_path = 'storage/'.$data->image_link;
        if (File::exists(public_path($image_path))) {
            File::delete(public_path($image_path));
        } else {
            return response('Image File Not Found', 500);
        }
        $data->delete();
        return response('', 204);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(News $news)
    {
        // $news->delete();
        $image_path = $news['image-link'];
        dd($image_path);
        // if(Storage::exists($image_path)){
        //     Storage::delete($image_path);
        // } else {
        // dd($image_path);
        // }
        return $news;
    }
}
