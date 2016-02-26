<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$app->get('/', function () use ($app) {
    return "yo";
});


$app->group(['prefix' => 'api/v1','namespace' => 'App\Http\Controllers'], function($app)
{

    $app->get('users','UserController@index');
    $app->post('user','UserController@createUser');
    $app->post('user/login','UserController@loginUser');

    $app->get('user/{id}/vehicles','VehicleController@indexByOwner');
    $app->get('user/{id}/active','LogController@indexActiveByOwner');
    $app->get('user/{id}/history','LogController@historyByOwner');

    $app->get('vehicles','VehicleController@index');
    $app->post('vehicle','VehicleController@createVehicle');
    $app->delete('vehicle/{id}','VehicleController@deleteVehicle');

    $app->get('locations','LocationController@index');
    $app->get('location/{id}','LocationController@getById');
    $app->post('location','LocationController@createLocation');

    $app->get('logs','LogController@index');
    $app->post('log','LogController@createLog');

});