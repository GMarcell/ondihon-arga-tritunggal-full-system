<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ListRequest;
use App\Models\Article;
use App\Http\Requests\StoreArticleRequest;
use App\Http\Requests\UpdateArticleRequest;
use App\Http\Resources\ArticleResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class ArticlesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(ListRequest $request)
    {
        return ArticleResource::collection(Article::query()->where('title', 'LIKE', '%' . $request['search'] . '%')->orderBy('id', 'desc')->paginate($request['per_page'], ['*'], 'page', $request['page']));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreArticleRequest $request)
    {
        $uploadFolder = 'article';
        $image = $request->file('image_link');

        $image_uploaded_path = $image->store($uploadFolder, 'public');

        $article = new Article();
        $article->title = $request->title;
        $article->description = $request->description;
        $article->image_link = $image_uploaded_path;
        $article->video_link = $request->video_link;

        $status = $article->save();

        if ($status) {
            return response('', 204);
        } else {
            return response('Create Article Failed', 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article)
    {
        return new ArticleResource($article);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateArticleRequest $request, Article $article)
    {
        //
    }

    public function updateArticle(UpdateArticleRequest $request, Article $article)
    {
        $data = $request->validated();
        $newArticle = $article->find($request->id);
        $image_path = 'storage/' . $article->image_link;
        if (File::exists(public_path($image_path))) {
            File::delete(public_path($image_path));
        }
        $uploadFolder = 'news';
        if (isset($data['image_link'])) {
            $image = $request->file('image_link');
            $image_uploaded_path = $image->store($uploadFolder, 'public');
            $status = $newArticle->update([
                'title' => $data['title'],
                'description' => $data['description'],
                'image_link' => $image_uploaded_path,
                'video_link' => $data['video_link'],
            ]);
        } else {
            $status = $newArticle->update([
                'title' => $data['title'],
                'description' => $data['description'],
                'video_link' => $data['video_link'],
            ]);
        }

        if ($status) {
            return response('', 204);
        } else {
            return response('Update Failed', 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        //
    }

    public function deleteArticle(Request $request, Article $article)
    {
        $data = $article->find($request->id);
        $image_path = 'storage/' . $data->image_link;
        if (File::exists(public_path($image_path))) {
            File::delete(public_path($image_path));
        } 
        // else {
        //     return response('Image File Not Found', 500);
        // }
        $data->delete();
        return response('', 204);
    }
}
