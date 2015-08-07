<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});

// Data Sets
Route::get("data", "DSController@index");
Route::get("data/new", "DSController@create");
Route::post("data/new", "DSController@store");
Route::get("data/{id}", "DSController@show");
Route::get("data/{id}/edit", "DSController@edit");

// Widgets
Route::resource("widgets", "WidgetController");