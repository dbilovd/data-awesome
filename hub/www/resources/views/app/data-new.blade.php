
@extends("layouts.base")

@section("head.title", "Create Dataset")

@section("body.main")

        <div class="row">
            <div class="two columns"> &nbsp; </div> <!-- hack to center cols -->

            <div class="eight columns">
                <h4> New Dataset </h4>

                <hr />

                @if (count($errors) > 0 )
                    <div class="alert alert-danger">
                        <ul>
                            @foreach ($errors -> all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif

                <form method="POST" action="" enctype="multipart/form-data">
                    <div class="row">
                        <div class="twelve columns">
                            <label> Upload </label>
                            <label><span class="description"> File holding your data in json </span></label>
                            <input type="file" name="ds-file" class="u-full-width" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="twelve columns">
                            <label> Name </label>
                            <label><span class="description"> Your url will be username/my-awesome-dataset </span></label>
                            <input type="text" name="ds-name" placeholder="my-awesome-dataset" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="twelve columns">
                            <label> Title </label>
                            <label><span class="description"> Name for humans </span></label>
                            <input type="text" name="ds-title" placeholder="My Awesome Dataset" class="u-full-width" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="twelve columns">
                            <label> Description <span> (optional) </span> </label>
                            <label><span class="description"> Tell us how awesome your dataset is </span></label>
                            <textarea name="ds-description" placeholder="My dataset is so awesome it is called 'My Awesome Dataset'" class="u-full-width"></textarea>
                        </div>
                    </div>

                    <div class="row">
                        <hr />

                        <button class="button button-primary" type="submit"> Create Dataset </button>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                    </div>
                </form>    
            </div>

            <div class="two columns"> &nbsp; </div> <!-- hack to center cols -->
        </div>
    
@endsection
