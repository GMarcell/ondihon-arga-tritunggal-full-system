<?php

use App\Http\Controllers\Api\ArticlesController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\NewsController;
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

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('users', UserController::class);
    Route::apiResource('news', NewsController::class);
    Route::apiResource('article', ArticlesController::class);
    Route::post('/news/delete/{id}', [NewsController::class, 'deleteNews']);
    Route::post('/news/update/{id}', [NewsController::class, 'updateNews']);
    Route::post('/article/delete/{id}', [ArticlesController::class, 'deleteArticle']);
    Route::post('/article/update/{id}', [ArticlesController::class, 'updateArticle']);
});
