<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PoolController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::controller(PoolController::class)->group(function () {
    Route::get('/', 'register');
    Route::get('/register/add', 'register_add');
    
    Route::get('/setting', 'setting_view');
    Route::get('/setting/getdata', 'setting_getdata');
    Route::get('/setting/save', 'setting_save');
    Route::get('/setting/clear', 'setting_clear');
    
    Route::get('/score', 'score_view');
    Route::get('/score/getdata', 'score_getdata');


    Route::get('/run_server', 'run_server');
    Route::get('/run_server/push', 'run_server_push');
});