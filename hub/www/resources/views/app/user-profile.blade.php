
@extends("layouts.base")

@section("head.title", $user -> name)


@section("body.subheader")

    <div class="sub-navbar">
        <div class="container">
            <div class="row">
                <div class="twelve columns">
                    <h4>
                        <a href='{{ route("profile", ["username" => $user -> name ]) }}'>{{ $user -> name }}</a>
                    </h4>
                    <h5>
                      {{ $user -> email }}
                    </h5>
                </div>
            </div>
        </div>
    </div>

@endsection


@section("body.main")

    <div class="row">
        <div class="twelve columns">

          <h4> Datasets </h4>

          @if (count($datasets) > 0 )
              <ul>
                  @foreach ($datasets as $dataset)
                      <li>
                         <h4>
                              <a href='{{ route("dataset", ["username" => $user -> name, "dataset" => $dataset -> name ]) }}'>
                                  {{ $dataset -> name }}
                              </a>
                          </h4>
                      </li>
                  @endforeach
              </ul>
          @else
              <a href="{{ route('create-data') }}" title="Create a new data set"> You haven't uploaded any data set yet </a>
          @endif

          <hr />

          <h4> Widgets </h4>

          @if (count($widgets) > 0 )
              <ul>
                  @foreach ($widgets as $widget)
                      <li>
                          <h4>
                              <a href='{{ route("widget", ["username" => $user -> name, "widget" => $widget -> id ]) }}'>
                                  {{ $widget -> title }}
                              </a>
                          </h4>
                      </li>
                  @endforeach
              </ul>
          @endif

    </div>

@endsection
