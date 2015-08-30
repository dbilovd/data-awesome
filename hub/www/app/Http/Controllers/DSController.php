<?php

/**
 * Data Set Controller
 *
 */

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Storage;
use App\Dataset;
use App\User;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class DSController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        //
        $allDS = Dataset::all();
        foreach ($allDS as $key => $dataset) {
            echo "<a href='/data/{$dataset -> id}'> " . (($dataset -> title) ? $dataset -> title : $dataset -> id) . " </a><br />";
        }
        exit();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        // Show creation form
        return view("app.data-new");
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        /**
         * @todo Further enhance validation
         */
        $validation = $this -> validate($request,
            [
                "ds-name" => "required|max:255",
                "ds-title" => "required|max:255",
                "ds-file" => "required"
            ]
        );

        // Get form data
        $ds_name = $request -> input("ds-name");
        $ds_title = $request -> input("ds-title");
        $ds_description = $request -> input("ds-description");
        // Get uploaded file
        $file = $request -> file("ds-file");
        // Verify upload
        if ($file -> isValid()) {
            // Create new name
            $filename = time() ."_" . $file -> getClientOriginalName();
            // Move file to storage
            if ($file -> move(base_path() . "/storage/app/uploads/ds", $filename)) {
                $ds_title = ($ds_title == "") ? $file -> getClientOriginalName() : $ds_title;
                // Save dataset
                $new_data_set = new Dataset();
                $new_data_set -> name = $ds_name;
                $new_data_set -> owner = $request -> user() -> id;
                $new_data_set -> title = $ds_title;
                $new_data_set -> description = $ds_description;
                $new_data_set -> file = $filename;

                if ($new_data_set -> save()) {
                    // Go the the widget page
                    return redirect() -> route("dataset", [
                        "username" => $request -> user() -> name,
                        "ds_name" => $new_data_set -> name
                    ]);
                } else {
                    return "Dataset creation failed";
                }

            } else {
                return "Moving file failed";
            }
        } else {
            return "Upload failed";
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  string $username
     * @param  string $dataset_name
     * @return Response
     */
    public function show($username, $dataset_name) {
        // Get dataset owner
        $owner = User::where("name", $username) -> first();
        if ($owner) {

            // Fetch dataset by name and owner
            $ds = Dataset::where("name", $dataset_name)
                    -> where("owner", $owner -> id)
                    -> first();

            if ($ds) {
                // Return Display dataset details
                return view("app.data-details")
                        -> with("owner", $owner)
                        -> with("dataset", $ds);
            }
        }

        // Throw 404 if it gets to this point.
        abort(404);

        // Show single data se
        echo "Fetching Dataset: " . $id . "<br />";

        $dataset = Dataset::find($id);
        if ($dataset) {
            echo "<h1>" . (($dataset -> title) ? $dataset -> title : $dataset -> id) . "</h1>";
            echo "<h3>" . $dataset -> file . "</h3>";
            echo (($dataset -> description) ? "<p>" . $dataset -> description . '<p>' : "");
            echo "<a href='edit'> Edit </a><br />";
            echo "<a href='delete' style='color: red;'> Delete </a>";
            return;
        } else {
            return "404 dataset not found";
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  string $username
     * @param  string $dataset_name
     * @return Response
     */
    public function showFile(Request $request, $data_set, $file_name) {
        // Get dataset
        $dataset = Dataset::where("id", $data_set) -> first();
        if ($dataset) {
            // Construct file path
            $file_path = "uploads/ds/" . $dataset -> file;
            // Check if file exists
            if (Storage::exists($file_path)) {
                // Get content of file and return.
                $file = Storage::get($file_path);

                return response($file);
            }

            // throw 404
            abort(404);
        }

        // Throw 404 if it gets to this point.
        abort(404);

        // Show single data se
        echo "Fetching Dataset: " . $id . "<br />";

        $dataset = Dataset::find($id);
        if ($dataset) {
            echo "<h1>" . (($dataset -> title) ? $dataset -> title : $dataset -> id) . "</h1>";
            echo "<h3>" . $dataset -> file . "</h3>";
            echo (($dataset -> description) ? "<p>" . $dataset -> description . '<p>' : "");
            echo "<a href='edit'> Edit </a><br />";
            echo "<a href='delete' style='color: red;'> Delete </a>";
            return;
        } else {
            return "404 dataset not found";
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        //
    }
}
