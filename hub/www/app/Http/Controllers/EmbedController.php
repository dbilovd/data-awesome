<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
// Models
use App\Widget;
use App\User;

class EmbedController extends Controller
{

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show ($id) {
        // return "Widget " . $id;
        
        // Fetch Widget Data
        $widget = Widget::where("id", $id) -> first();
        
        if ($widget) {
            $to_return = view("embed/widget") -> with("widget", $widget);
            // Get owner
            if ($widget -> owner) {
                $widget_owner = User::where("id", $widget -> owner) -> first();;

                if ($widget_owner) {
                    $to_return -> with("owner", $widget_owner);
                }
            }

            // return $widget;
            // return view("embed/widget") -> with("widget", $widget)
            //     -> with("owner", "");
            return $to_return;
        }
        
        // abort(404, "Widget not found");
        return "Widget not found error";
    }
}
