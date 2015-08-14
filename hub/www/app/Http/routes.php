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

// Authentication routes...
Route::get('auth/login', 'Auth\AuthController@getLogin');
Route::post('auth/login', 'Auth\AuthController@postLogin');
Route::get('auth/logout', 'Auth\AuthController@getLogout');

// Registration routes...
Route::get('auth/register', 'Auth\AuthController@getRegister');
Route::post('auth/register', 'Auth\AuthController@postRegister');

Route::get("/home", function() {
	return Auth::user();
});

Route::get('/', function () {
    return view('index');
});

// Data Sets
Route::get("data", "DSController@index");
Route::get("data/new", [
	"as" => "create-dataset",
	"middleware" => "auth",
	"uses" => "DSController@create"
]);
Route::post("data/new", [
	"as" => "create-dataset-post",
	"middleware" => "auth",
	"uses" => "DSController@store"
]);

// Widgets
Route::get("widget/new", [
	"as" => "create-widget",
	"middleware" => "auth",
	"uses" => "WidgetController@create"
]);
Route::post("widget/new", [
	"as" => "create-widget-post",
	"middleware" => "auth",
	"uses" => "WidgetController@store"
]);

// If none of the routes matches then use the first 
Route::get("/{username}", [
	"as" => "profile",
	"uses" =>  "UserController@show"
]);

// Datasets
Route::get("/{username}/{ds_name}", [
	"as" => "dataset",
	"uses" => "DSController@show"
]);

// Widgets
Route::get("/{username}/widgets/{widget}", [
	"as" => "widget",
	"uses" => "WidgetController@show"
]);