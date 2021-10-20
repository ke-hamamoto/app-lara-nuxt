<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
//==========ここから追加==========
use Illuminate\Database\Eloquent\Relations\BelongsTo;
//==========ここまで追加==========

class Article extends Model
{

  // fillableかguardedのどちらかを指定する必要あり
  // protected $guarded = [''];
  protected $fillable = ['title', "body", "user_id"];

  public function user(): BelongsTo
  {
    return $this->belongsTo('App\Modles\User');
  }
}
