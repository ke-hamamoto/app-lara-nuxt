<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
// use Illuminate\Support\Facades\Auth;  // 追加

class ArticleRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   *
   * @return bool
   */
  public function authorize()
  {
    return true;
    // return Auth::user() ? true : false;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array
   */
  public function rules()
  {
    return [
      //==========ここから追加==========
      'title' => 'required|max:50',
      'comment' => 'required|max:140',
      //==========ここまで追加==========
    ];
  }

  //==========ここから追加==========
  public function attributes()
  {
    return [
      'title' => 'タイトル',
      'comment' => '本文',
    ];
  }
  //==========ここまで追加==========

}
