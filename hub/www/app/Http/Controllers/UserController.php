<?php

/**
 * Data Set Controller
 *
 */

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Dataset;
use App\User;
use App\Widget;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class UserController extends Controller
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
         * @todo Perform validation
         */

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
                    return "Dataset created successfully";
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
    public function show($username) {
        // Get dataset owner
        $user = User::where("name", $username) -> first();
        if ($user) {

            // Fetch dataset by name and owner
            $datasets = Dataset::where("owner", $user -> id)
                        -> get();
            // Widgets
            $widgets = Widget::where("owner", $user -> id)
                        -> get();

            if ($datasets) {
                // Return user profile
                return view("app.user-profile")
                        -> with("user", $user)
                        -> with("datasets", $datasets)
                        -> with("widgets", $widgets);
            }
        }
        
        // Throw 404 if it gets to this point.
        abort(404);
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
