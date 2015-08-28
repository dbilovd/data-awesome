
@extends("layouts.base")

@section("head.title", $dataset -> title)


@section("body.subheader")

    <div class="sub-navbar">
        <div class="container">
            <div class="row">
                <div class="twelve columns">
                    <h5>
                        <a href='{{ route("profile", ["username" => $owner -> name ]) }}'>{{ $owner -> name }}</a> 
                        /
                        <a href="{{ route("dataset", ["username" => $owner -> name, "dataset" => $dataset -> name ]) }}">{{ $dataset -> name }}</a>
                    </h5>
                </div>
            </div>
        </div>
    </div>

@endsection


@section("body.main")

    <div class="row">
        <div class="twelve columns">

            <h5> {{ $dataset -> title }} </h5>

            
        </div>
    </div>

@endsection
