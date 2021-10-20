<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;  // 追加

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// 追加
// Route::group(["middleware" => ["api", "cors"]], function () {
// Route::group(["middleware" => ["api"]], function () {
Route::middleware([])->group(function () {

  Route::options('test', function () {
    return response()->json();
  });
  Route::get("test", function () {
    return var_dump("test!!!!!");
  });

  Route::options('/login', function () {
    return response()->json();
  });
  Route::post('/login', 'Auth\LoginController@login')->name('login');

  Route::options('/current_user', function () {
    return response()->json();
  });
  Route::get('/current_user', function () {
    // var_dump(Auth::user());
    return Auth::user();
  })->name('current_user');

  Route::options('/get-comment', function () {
    return response()->json();
  });
  Route::get('/get-comment', 'ArticleController@index')->name('get-comment');

  Route::options('/add-comment', function () {
    return response()->json();
  });
  Route::post('/add-comment', 'ArticleController@create')->name('add-comment');
});

Route::middleware('auth:api')->group(function () {
  Route::options('/logout', function () {
    return response()->json();
  });
  Route::post('/logout', 'Auth\LoginController@logout')->name('logout');
});
