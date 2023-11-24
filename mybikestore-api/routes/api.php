<?php

use App\Http\Controllers\BikeController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('bikes', [BikeController::class, 'index']);
Route::post('bikes', [BikeController::class, 'store']);
Route::get('bikes/{bike}', [BikeController::class, 'show']);
Route::put('bikes/{bike}', [BikeController::class, 'update']);
Route::patch('bikes/{bike}/quantity', [BikeController::class, 'updateQuantity']);
Route::delete('bikes/{bike}', [BikeController::class, 'destroy']);

Route::get('categories', [CategoryController::class, 'index']);
Route::get('brands', [BrandController::class, 'index']);

