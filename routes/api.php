<?php

use App\Http\Controllers\Api\ArticlesController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CustomersController;
use App\Http\Controllers\Api\NewsController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/getProductByType', [ProductController::class, 'GetBasedOnType']);
Route::get('/getAllNews', [NewsController::class, 'index']);
Route::get('/getAllArticles', [ArticlesController::class, 'index']);
Route::get('/getAllCustomer', [CustomersController::class, 'index']);
Route::get('/getProductInfo/{id}', [ProductController::class, 'show']);
Route::get('/getNewsInfo/{id}', [NewsController::class, 'show']);
Route::get('/getArticleInfo/{id}', [ArticlesController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('users', UserController::class);
    Route::apiResource('news', NewsController::class);
    Route::apiResource('article', ArticlesController::class);
    Route::apiResource('customer', CustomersController::class);
    Route::apiResource('product', ProductController::class);
    Route::post('/news/delete/{id}', [NewsController::class, 'deleteNews']);
    Route::post('/news/update/{id}', [NewsController::class, 'updateNews']);
    Route::post('/article/delete/{id}', [ArticlesController::class, 'deleteArticle']);
    Route::post('/article/update/{id}', [ArticlesController::class, 'updateArticle']);
    Route::post('/customer/delete/{id}', [CustomersController::class, 'deleteCustomer']);
    Route::post('/customer/update/{id}', [CustomersController::class, 'updateCustomer']);
    Route::post('/product/delete/{id}', [ProductController::class, 'deleteProduct']);
    Route::post('/product/update/{id}', [ProductController::class, 'updateProduct']);
});
