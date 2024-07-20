<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use App\Http\Requests\StoreSurveyRequest;
use App\Http\Requests\UpdateSurveyRequest;
use App\Http\Resources\SurveyResource;
use App\Models\Answer;
use App\Models\SurveyQuestion;
use Illuminate\Http\Request;
use Str;
use File;

class SurveyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $surveys = Survey::where('user_id', auth()->id())->with('survey_questions')->latest()->paginate(2);
        return SurveyResource::collection($surveys);
        // return $this->jsonResponse($surveys);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'image' => 'nullable',
            'expiry_date' => 'required|date',
            'status' => 'required',
            'questions' => 'required|array',
            'questions.*.question' => 'required|string',

        ]);

        if (isset($request->image)) {
            $relativePath = $this->saveImage($request->image);
        }

        $survey = Survey::create(array_merge($request->all(), ['user_id' => auth()->id(), 'image' => @$relativePath]));

        $survey->update(['slug' => Str::slug($survey->title) . "-" . $survey->id]);

        foreach ($request->questions as $questionData) {
            SurveyQuestion::create([
                'survey_id' => $survey->id,
                'question' => $questionData['question'],
                'type' => $questionData['type'],
                'description' => $questionData['description'],
                'data' => $questionData['data']
            ]);
        }

        return $this->jsonResponse();
    }

    /**
     * Display the specified resource.
     */
    public function show(Survey $survey)
    {
        $survey->load('survey_questions');
        return new SurveyResource($survey);
    }

    public function details(Survey $survey)
    {
        $survey->load('survey_questions');
        $survey->load('survey_questions.answers');
        return new SurveyResource($survey);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Survey $survey)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Survey $survey)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'image' => 'nullable',
            'expiry_date' => 'required|date',
            'status' => 'required',
            'questions' => 'required|array',
            'questions.*.question' => 'required|string',

        ]);

        if (isset($request->image)) {
            $relativePath = $this->saveImage($request->image);
        } else {
            $relativePath = $survey->image;
        }

        $survey->update(array_merge($request->all(), ['user_id' => auth()->id(), 'image' => @$relativePath]));

        SurveyQuestion::where('survey_id', $survey->id)->delete();

        foreach ($request->questions as $questionData) {
            SurveyQuestion::create([
                'survey_id' => $survey->id,
                'question' => $questionData['question'],
                'type' => $questionData['type'],
                'description' => $questionData['description'],
                'data' => $questionData['data']
            ]);
        }
        return $this->jsonResponse();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Survey $survey)
    {
        $survey->survey_questions()->delete();
        $survey->delete();
        return $this->jsonResponse();
    }


    private function saveImage($image)
    {
        // Check if image is valid base64 string
        if (preg_match('/^data:image\/(\w+);base64,/', $image, $type)) {
            // Take out the base64 encoded text without mime type
            $image = substr($image, strpos($image, ',') + 1);
            // Get file extension
            $type = strtolower($type[1]); // jpg, png, gif

            // Check if file is an image
            if (!in_array($type, ['jpg', 'jpeg', 'gif', 'png'])) {
                throw new \Exception('invalid image type');
            }
            $image = str_replace(' ', '+', $image);
            $image = base64_decode($image);

            if ($image === false) {
                throw new \Exception('base64_decode failed');
            }
        } else {
            throw new \Exception('did not match data URI with image data');
        }

        $dir = 'images/';
        $file = Str::random() . '.' . $type;
        $absolutePath = public_path($dir);
        $relativePath = $dir . $file;
        if (!File::exists($absolutePath)) {
            File::makeDirectory($absolutePath, 0755, true);
        }
        file_put_contents($relativePath, $image);

        return $relativePath;
    }


    public function getBySlug(Survey $survey)
    {
        $survey->load('survey_questions');
        return new SurveyResource($survey);
    }


    public function saveAnswer(Request $request)
    {

        foreach ($request->answers as $questionId => $answer) {
            Answer::create([
                'survey_id' => $request->survey_id,
                'survey_question_id' => $questionId,
                'answer' => $answer,
            ]);
        }

        return $this->jsonResponse();
    }
}
