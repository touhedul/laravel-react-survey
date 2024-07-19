<?php

namespace App\Http\Controllers;

use App\Http\Resources\SurveyQuestionAnswerResource;
use App\Http\Resources\SurveyResource;
use App\Models\Survey;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $success['token'] =  $user->createToken('MyApp')->plainTextToken;
            $success['user'] =  $user;

            return $this->jsonResponse($success);
        } else {
            return $this->jsonResponse([], "Invalid credentials", 401);
        }
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'confirm_password' => 'required|same:password',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        $data['token'] =  $user->createToken('MyApp')->plainTextToken;
        $data['user'] =  $user;

        return $this->jsonResponse($data);
    }

    public function logout(Request $request)
    {
        auth()->user()->tokens()->delete();
        return $this->jsonResponse();
    }


    public function user()
    {
        return $this->jsonResponse(auth()->user());
    }


    public function dashboard()
    {
        $surveys = Survey::where('user_id', auth()->id())->with('survey_questions.answers')->get();
        $total_survey_count = $surveys->count();
        return $this->jsonResponse(['surveys' => SurveyResource::collection($surveys), 'total_survey_count' => $total_survey_count]);
    }
}
