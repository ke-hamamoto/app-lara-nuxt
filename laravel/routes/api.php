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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//   return $request->user();
// });

// 追加
// Route::group(["middleware" => ["api", "cors"]], function () {
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
  Route::options('/current_user', function () {
    return response()->json();
  });
  // Route::get('/current_user', function () {
  //   return Auth::user();
  // })->name('current_user');
  // Route::namespace('Auth')->group(function () {
  //   Route::post('/login', 'LoginController@login')->name('login');
  // });
  Route::post('/login', 'Auth\LoginController@login')->name('login');
  Route::get('/current_user', function () {
    // var_dump(Auth::user());
    return Auth::user();
  })->name('current_user');
});

// Route::middleware('api')->get('/test', function (Request $request) {
//   return var_dump("test!!");
// });

// Route::group(['middleware' => ['api', 'cors']], function () {
//   Route::options('sample', function () {
//     return response()->json();
//   });
//   Route::resource('sample', 'Controllers\ArticlesController');
// });

// Route::middleware(['api','cors'])->group(function () {
// Route::middleware(['api'])->group(function () {
//   Route::options('test', function () {
//     return response()->json();
//   });
//   Route::get("test", function () {
//     return var_dump("test!!!!!");
//   });
// });
