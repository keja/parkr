<?php

namespace App\Http\Controllers;

use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index(){

        $users  = User::all();

        return response()->json($users);

    }

    public function createUser(Request $request){

        $this->validate($request, [
            'name' => 'required',
            'email' => 'required|unique:users',
            'username' => 'required|unique:users',
            'password' => 'required'
        ]);

        $user = new User;

        $user->name     = $request->input("name");
        $user->email    = $request->input("email");
        $user->username = $request->input("username");
        $pre_hash       = $request->input("password");
        $user->password = Hash::make($pre_hash);

        $user->save();

        return response()->json($user, 201);

    }

    public function loginUser(Request $request){

        $user = User::where('email', $request->input('email'))->first();

        if($user){
            if (Hash::check($request->input('password'), $user->password)) {
                return response()->json($user);
            }
        }

        $data = array(
            'status' => 'incorrect login'
        );
        return response()->json($data, 401);


    }


}
