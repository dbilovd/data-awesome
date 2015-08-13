<?php

/**
 * Data Set Controller
 *
 */

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Dataset;
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
        //
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
        $title = $request -> input("data-title");
        $description = $request -> input("data-description");
        // Get uploaded file
        $file = $request -> file("data-file");
        // Verify upload
        if ($file -> isValid()) {
            // Create new name
            $filename = time() ."_" . $file -> getClientOriginalName();
            // Move file to storage
            if ($file -> move(base_path() . "/storage/app/uploads/ds", $filename)) {
                $title = ($title == "") ? $file -> getClientOriginalName() : $title;
                // Save dataset
                $new_data_set = new Dataset();
                $new_data_set -> owner = $request -> user() -> id;
                $new_data_set -> title = $title;
                $new_data_set -> description = $description;
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
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
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
