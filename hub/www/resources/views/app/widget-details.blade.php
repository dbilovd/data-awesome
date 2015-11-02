
@extends("layouts.base")

@section("head.title", $widget -> title)


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
                        <a >{{ $widget -> id }}</a>

                        <span style="float: right;">
                            <a class="button" href="{{ route('get-widget-code', [ 'username' => $owner -> name, 'widget' => $widget -> id ]) }}"> 
                                Get Embed Codes
                            </a>
                            <a class="button" href="{{ route('edit-widget-graph', [ 'widget' => $widget -> id ]) }}"> 
                                Edit graph 
                            </a>
                        </span>
                    </h5>
                </div>
            </div>
        </div>
    </div>

@endsection


@section("body.main")

    <div class="row">
        <div class="twelve columns">

            <h5> Widget </h5>

            
        </div>
    </div>

@endsection
