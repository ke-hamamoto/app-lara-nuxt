<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
  return $request->user();
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

Route::middleware(['api', 'cors'])->group(function () {
  Route::options('test', function () {
    return response()->json();
  });
  Route::get("test", function () {
    return var_dump("test!!!!!");
  });
});
