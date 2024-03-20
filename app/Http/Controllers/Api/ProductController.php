<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ListRequest;
use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(ListRequest $request)
    {
        return ProductResource::collection(Product::query()->where('title', 'LIKE', '%' . $request['search'] . '%')->orderBy('id', 'desc')->paginate($request['per_page'], ['*'], 'page', $request['page']));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $uploadFolder = 'product';
        $image = $request->file('image_link');

        $image_uploaded_path = $image->store($uploadFolder, 'public');

        $product = new Product();
        $product->type = $request->type;
        $product->title = $request->title;
        $product->description = $request->description;
        $product->image_link = $image_uploaded_path;

        $status = $product->save();

        if ($status) {
            return response('', 204);
        } else {
            return response('Create Article Failed', 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return new ProductResource($product);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        //
    }

    public function updateProduct(UpdateProductRequest $request, Product $product)
    {
        $data = $request->validated();
        $newProduct = $product->find($request->id);
        $image_path = 'storage/' . $newProduct->image_link;
        if (File::exists(public_path($image_path))) {
            File::delete(public_path($image_path));
        }
        $uploadFolder = 'product';
        if (isset($data['image_link'])) {
            $image = $request->file('image_link');
            $image_uploaded_path = $image->store($uploadFolder, 'public');
            $status = $newProduct->update([
                'type' => $data['type'],
                'title' => $data['title'],
                'description' => $data['description'],
                'image_link' => $image_uploaded_path,
            ]);
        } else {
            $status = $newProduct->update([
                'type' => $data['type'],
                'title' => $data['title'],
                'description' => $data['description'],
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
    public function destroy(Product $product)
    {
        //
    }

    public function deleteProduct(Request $request, Product $product)
    {
        $data = $product->find($request->id);
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
