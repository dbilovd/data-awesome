
@extends("layouts.base")

@section("head.title", "Create Widget")


@section("body.subheader")

    <div class="sub-navbar">
        <div class="container">
            <div class="row">
                <div class="twelve columns">
                    <h5>
                        <a href='{{ route("profile", ["username" => $owner -> name ]) }}'>{{ $owner -> name }}</a>
                        /
                        <a href="{{ route("widgets", ["username" => $owner -> name]) }}">Widgets</a>
                        /
                        <a href="{{ route("widget", ["username" => $owner -> name, "widget" => $widget -> id ]) }}">{{ $widget -> id }}</a>
                    </h5>
                </div>
            </div>
        </div>
    </div>

@endsection

@section("body.main")

    <?php
    $query_php = json_decode($widget -> query, TRUE);
    ?>
        <div class="row">
            <div id="widget-container" class="twelve columns">

                @if (count($errors) > 0 )
                    <div class="alert alert-danger">
                        <ul>
                            @foreach ($errors -> all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif

                <form id="widget-form" method="POST" action="<?php echo route("save-widget-graph", [ "widget" => $widget -> id ]) ?>"
                    enctype="multipart/form-data" >

                    <div class="row">
                        <div class="three columns">
                            <div class="da-column-header">
                                <h5> Configure </h5>
                            </div>
                            <div class="da-widget-graph-form">
                                <div class="row">
                                    <div class="twelve columns">
                                        <label> Type of graph </label>
                                        <?php
                                        $chart_types = array("bar" => "Bar Chart",
                                            "scatter" => "Scatter Diagram",
                                            "line" => "Line",
                                            "line-area" => "Line (Area)",
                                            "arc" => "Arc"
                                        );
                                        ?>
                                        <select name="w-graph-type" class="u-full-width" id="w-graph-type">
                                            @foreach ($chart_types as $key => $chart_type)
                                                <option value="{{ $key }}"
                                                    @if ($key == $query_php["type"])
                                                        selected="selected"
                                                    @endif
                                                > {{ $chart_type }} </option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                                <!-- Show dots -->
                                <div class="row" id="wc-graph-dots">
                                    <div class="twelve columns">
                                        <label  class="u-full-width">
                                            <input type="checkbox" id="w-graph-dots" /> Show dots
                                        </label>
                                    </div>
                                </div>
                                <!-- Show labels -->
                                <div class="row" id="wc-graph-labels">
                                    <div class="twelve columns">
                                        <label  class="u-full-width">
                                            <input type="checkbox" id="w-graph-labels" /> Show labels
                                        </label>
                                    </div>
                                </div>
                                
                                <!-- Misc -->
                                <div class="row">
                                    <div class="twelve columns" id="additional-fields">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="nine columns">
                            <div class="row da-column-header">
                                <div class="one-half column">
                                    <h5> Preview </h5>
                                </div>
                                <div class="one-half column">
                                    <button id="w-save-widget" type="submit" class="button button-primary u-pull-right"> Save Widget </button>
                                </div>
                            </div>
                            <div class="row">
                                <div class="twelve columns">
                                    <div id="da-preview-canvas" class="da-preview-canvas da-text-center"> </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- data-type: file type. Currently developing with json files. -->
                    <input type="hidden" id="w_data_file"  data-type="{{ $dataset -> ext }}" value='{{ route("data-file",  [ "data_set" => $dataset -> id, "file_name" => $dataset -> file ] ) }}' />
                    <input type="hidden" id="w_data_query" value="{{ $widget -> query }}" />
                    <input type="hidden" id="w_data" name="_data" value="" />
                    <input type="hidden" id="w_data_xml" name="_data_xml" value="" />
                    <input type="hidden" name="_token" value="{{ csrf_token() }}" />
                </form>

            </div>

        </div>

@endsection

@section ("head.scripts")
    <script type="text/javascript" src="<?php echo asset("js/lib/require.js"); ?>" data-main="/js/main"></script>
@endsection
