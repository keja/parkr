<?php

namespace App\Http\Controllers;

use App\Vehicle;
use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class VehicleController extends Controller
{
    public function index(){

        $vehicles  = Vehicle::all();

        return response()->json($vehicles);

    }

    public function indexByOwner($owner_id){

        $vehicles  = Vehicle::where('owner_id', $owner_id)->get();

        return response()->json($vehicles);

    }

    public function createVehicle(Request $request){

        $this->validate($request, [
            'title' => 'required',
            'plate' => 'required|unique:vehicles',
            'owner_id' => 'required'
        ]);

        $owner = User::where('id', $request->input('owner_id'))->first();

        if(!$owner) {
            $data = array(
                'status' => 'error'
            );
            return response()->json($data, 422);
        }

        $vehicle = new Vehicle;

        $vehicle->title     = $request->input("title");
        $vehicle->plate     = $request->input("plate");
        $vehicle->owner_id  = $request->input("owner_id");

        $vehicle->save();

        return response()->json($vehicle, 201);

    }

    public function deleteVehicle($id){

        $vehicle  = Vehicle::find($id);
        $vehicle->delete();

        return response()->json('deleted');

    }




}
