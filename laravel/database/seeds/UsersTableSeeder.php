<?php

use Illuminate\Database\Seeder;
use App\Models\User;

class UsersTableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    // 外部キー制約の無視 start
    DB::statement('SET FOREIGN_KEY_CHECKS=0;');

    \DB::table('users')->truncate();
    for ($idx = 0; $idx < 3; $idx++) {
      factory(User::class, 1)->create([
        'email' => 'test' . $idx . '@email.com',
      ]);
    }
    // 外部キー制約の無視 end
    DB::statement('SET FOREIGN_KEY_CHECKS=1;');
  }
}
