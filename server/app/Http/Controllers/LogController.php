<?php

namespace App\Http\Controllers;

use DB;

use App\Log;
use App\Location;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LogController extends Controller
{
    public function index(){

        $log  = Log::all();

        return response()->json($log);

    }

    public function indexActiveByOwner($owner_id){

        $res = \DB::table('logs')
            ->where('logs.owner_id', $owner_id)
            ->where('expires', '>', (new \DateTime)->getTimestamp())
            ->join('locations', 'logs.location_id', '=', 'locations.id')
            ->join('vehicles', 'logs.vehicle_id', '=', 'vehicles.id')
            ->select('logs.*', 'locations.zone','locations.lat','locations.long', 'vehicles.title')
            ->orderBy('id', 'desc')
            ->get();

        $t = [];
        foreach($res as $r){
            $ex = $r->expires;
            $r->expires = date('Y-m-d H:i:s', $ex);
            array_push($t, $r);
        }

        return response()->json($t);

    }

    public function historyByOwner($owner_id){

        $res = \DB::table('logs')
            ->where('logs.owner_id', $owner_id)
            ->where('expires', '<', (new \DateTime)->getTimestamp())
            ->join('locations', 'logs.location_id', '=', 'locations.id')
            ->join('vehicles', 'logs.vehicle_id', '=', 'vehicles.id')
            ->select('logs.*', 'locations.zone','locations.lat','locations.long', 'vehicles.title')
            ->orderBy('id', 'desc')
            ->get();

        $t = [];
        foreach($res as $r){
            $ex = $r->expires;
            $r->expires = date('Y-m-d H:i:s', $ex);
            array_push($t, $r);
        }

        return response()->json($t);

    }

    public function isLocationFree($location_id){

        $logs  = Log::where('location_id', $location_id)
            ->where('expires', '>', time())
            ->get();
        return response()->json($logs);

    }

    public function createLog(Request $request){

        $this->validate($request, [
            'location_id' => 'required',
            'owner_id' => 'required',
            'vehicle_id' => 'required',
            'expires' => 'required'
        ]);

        date_default_timezone_set('Europe/Copenhagen');

        $log = new Log;

        $log->location_id = $request->input("location_id");
        $log->owner_id = $request->input("owner_id");
        $log->vehicle_id = $request->input("vehicle_id");
        $log->expires = $request->input("expires");

        $diff = $log->expires - (new \DateTime)->getTimestamp();
        if($diff < 0) {
            return response()->json("Expire-time has happened", 422);
        }
        $diffMins = floor( $diff / 60 );
        $log->duration = $diffMins;

        $location = Location::where('id', $log->location_id)->first();
        if(!$location){
            return response()->json("Location does not exist", 422);
        }

        $logByLoc = Log::where('location_id', $log->location_id)
            ->orderBy('expires', 'desc')->first();
        if($logByLoc){
            if(!$logByLoc->isLocationFree()){
                return response()->json("Location is already in use", 422);
            }
        }

        $log->price = floor( $diffMins / 60 * $location->price);

        $log->save();

        return response()->json($log, 201);

    }


}
