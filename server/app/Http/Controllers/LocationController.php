<?php

namespace App\Http\Controllers;

use App\Location;
use App\Log;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    public function index(){

        $locations  = Location::all();

        return response()->json($locations);

    }

    public function indexByZoneName(Request $request){

        $locations  = Location::where('zone', $request->input('zone'))->get();

        return response()->json($locations);

    }

    public function getById($id){

        $location  = Location::where('id', $id)->first();
        if(!$location){
            return response()->json("Not found", 404);
        }

        $log = Log::where('location_id', $id)
            ->orderBy('expires', 'desc')->first();

        if($log){
            $isFree = $log->isLocationFree();
        } else {
            $isFree = true;
        }
        $data = array(
            "locationObject" => $location,
            "isLocationFree" => $isFree
        );
        return response()->json($data);

    }

    public function createLocation(Request $request){

        $this->validate($request, [
            'zone' => 'required',
            'price' => 'required',
            'lat' => 'required',
            'long' => 'required'
        ]);

        $location = new Location;

        $location->zone     = $request->input("zone");
        $location->price    = $request->input("price");
        $location->lat      = $request->input("lat");
        $location->long     = $request->input("long");

        $location->save();

        return response()->json($location, 201);

    }

    public function deleteLocation($id){

        $location  = Location::find($id);
        $location->delete();

        return response()->json('deleted');

    }


}
