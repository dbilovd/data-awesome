<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Storage;

use App\Dataset;
use App\Widget;
use App\User;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class WidgetController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        //
        return "List all widgets";
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        // Get all data sources
        $data_sets = Dataset::all();
        // Return view
        return view("app/widget-new", ["data_sets" => $data_sets]);
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
         * @todo Add validation
         */
        $validation = $this -> validate($request,
            [
                "w-data" => "required",
                "w-title" => "required",
                // "w-graph-type" => "required",
            ]
        );

        // Data source
        $widget_data_id = $request -> input("w-data");
        $widget_data = Dataset::find($widget_data_id);
        $widget_title = $request -> input("w-title");
        if ($widget_data) {
            
            $new_widget = new Widget();
            $new_widget -> dataset = $widget_data -> id;
            $new_widget -> owner = $request -> user() -> id;
            $new_widget -> title = $widget_title;
            
            if ($new_widget -> save()) {
                // Go the the widget page
                return redirect() -> route("widget", [
                    "username" => $request -> user() -> name,
                    "widget" => $new_widget -> id
                ]);
            } else {
                return "Failed to save widget";
            }
            

            /*
            // Widget queries
            $widget_query_graph = $request -> input("widget-query-graph");

            // Construct R command
            $fullpath_f = realpath( storage_path() . "/app/uploads/ds/" . $widget_data -> file );
            $fullpath = realpath ( storage_path() .  "/app/uploads/imgs/" );
            $exec_path = realpath( base_path() . '/../../r/generateGraph.R' );
            
            $command = "Rscript {$exec_path} {$fullpath_f} {$fullpath}";

            $command_arguments = array();
            if ($widget_query_graph) {
                $command_arguments[0] = $widget_query_graph;
            }
            /*
                        // Get post of graph
                        if (isset($_POST['graph'])) {
                            $graph = $_POST['graph'];
                            $command = $command . " " . $graph;

                            // post colx
                            if (isset($_POST['colx'])) {
                                $colx = $_POST['colx'];
                                $command = $command . " " . $colx;

                                // post coly
                                if (isset($_POST['coly'])) {
                                    $coly = $_POST['coly'];
                                    $command = $command . " " . $coly;
                                } else {
                                    $command = $command . " NULL";
                                }
                            }
                        }
                        *\/

            # Execute
            # Final command should : Rscript [generateGraph.R] [data source] [output location] [type] [colX] [colY]
            // print($command);
            // print '<pre>' . print_r($command_arguments, TRUE) . '</pre>'; exit();
            $command = $command . " " . implode(" ", $command_arguments);
            // print $command; exit();
            exec($command, $output);
            */
            
        } else {
            return "Data set not found";
        }
    }

    /**
     * Generate graph for a widget
     *
     */
    public function create_graph (Request $request, $widget_id) {
        // Fetch widget if by current user
        $widget = Widget::where("id", $widget_id)
                    -> where("owner", $request -> user() -> id)
                    -> first();

        if ($widget) {
            // Fetch Dataset
            $dataset = Dataset::where("id", $widget -> dataset) -> first();

            if ($dataset) {
                // Return view
                return view("app.widget-graph")
                    -> with("owner", $request -> user())
                    -> with("dataset", $dataset)
                    -> with("widget", $widget);
            } else {
                return "Failed to fetch dataset";
            }
        }

        // Throw 404
        abort(404);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show ($username, $widget_id) {
        // Get widget owner
        $owner = User::where("name", $username) -> first();
        if ($owner) {

            // Fetch widget by owner
            $widget = Widget::where("owner", $owner -> id)
                -> where("id", $widget_id)
                -> first();

            if ($widget) {
                return view("app.widget-details")
                    -> with("owner", $owner)
                    -> with("widget", $widget);
            }
        }

        // Throw 404 error
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
        return "Edit a specific widget";
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
        return "Save edited widget";
    }

    /**
     * Update the widget graph query configuration to db
     *
     * @param  Request  $request
     * @param  int  $widget_id
     * @return Response
     */
    public function update_graph (Request $request, $widget_id) {

        // Fetch widget if by current user
        $widget = Widget::where("id", $widget_id)
                    -> where("owner", $request -> user() -> id)
                    -> first();

        if ($widget) {

            $widget -> query = $request -> input("_data");
            /**
             * Save svg image
             */
            // construct storage path
            $file_name = $widget -> owner . "_" . $widget -> id . "_" . time();
            // Create new directory to hold this file
            Storage::makeDirectory("graphs/" . $file_name);
            // Final file path
            $file_name = "graphs/" . $file_name . "/" . $file_name . ".svg";
            // Save file
            if (Storage::put($file_name, $request -> input("_data_xml"))) {
                // Update widget with file path
                $widget -> image = $file_name;
            }

            if ($widget -> save()) {
                // Redirect to widget page
                return redirect() -> route("widget", [
                    "username" => $request -> user() -> name,
                    "widget" => $widget -> id
                ]);

            } else {
                return "Failed to save";
            }
        }

        // Throw 404
        abort(404);
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
        return "Delete a widget";
    }
}
