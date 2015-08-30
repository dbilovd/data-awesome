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
Route::get('/signin', [
	"as" => "signin",
	"uses" => 'Auth\AuthController@getLogin'
]);
Route::post('/signin', [
	"as" => "signin_submit",
	"uses" => 'Auth\AuthController@postLogin'
]);
Route::get('/signout', [
	"as" => "signout",
	"uses" => 'Auth\AuthController@getLogout'
]);

// Registration routes...
Route::get('/join', [
	"as" => "join",
	"uses" => 'Auth\AuthController@getRegister'
]);
Route::post('/join', [
	"as" => "join_submit",
	"uses" => 'Auth\AuthController@postRegister'
]);

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

Route::get("/file/data/{data_set}/{file_name}", [
		"as" => "data-file",
		"uses" => "DSController@showFile"
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
Route::get("widget/{widget}/graph", [
	"as" => "edit-widget-graph",
	"middleware" => "auth",
	"uses" => "WidgetController@create_graph"
]);
// Save widget graph settings
Route::post("widget/{widget}/graph", [
	"as" => "save-widget-graph",
	"middleware" => "auth",
	"uses" => "WidgetController@update_graph"
]);

// Widget's image
Route::get("/js/embed.html/{widget_id}/image", [
	"as" => "get-embed-widget-image",
	"uses" => "EmbedController@show_image"
]);
// Widget's embed
Route::get("/js/embed.html/{widget_id}", [
    "as" => "embed-widget",
    "uses" => "EmbedController@show"
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
Route::get("/{username}/widgets", [
	"as" => "widgets",
	"uses" => "WidgetController@index"
]);

Route::get("/{username}/widgets/{widget}", [
	"as" => "widget",
	"uses" => "WidgetController@show"
]);
