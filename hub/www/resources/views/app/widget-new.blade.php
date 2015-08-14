
@extends("layouts.base")

@section("head.title", "Create Widget")

@section("body.main")

        <div class="row">
            <div class="two columns"> &nbsp; </div> <!-- hack to center cols -->

            <div class="eight columns">

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
                        <div class="one-half column">
                            <div class="da-column-header">
                                <h5> Configure </h5>
                            </div>
                            <div class="da-widget-form">
                                <div class="row">
                                    <div class="twelve columns">
                                        <label> Datasets </label>
                                        <select name="w-data" class="u-full-width">
                                            @foreach ($data_sets as $dataset)
                                                <option value="{{ $dataset -> id }}">{{ $dataset -> title }} </option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="twelve columns">
                                        <label> Title </label>
                                        <input type="text" class="u-full-width" name="w-title" placeholder="My Awesome Widget" />
                                    </div>
                                </div>
                                <div class="row">
                                        <div class="twelve columns">
                                            <label> Type of graph </label>
                                            <select name="w-graph-type" class="u-full-width" id="graph-type">
                                                <option value="bar"> Bar Graph </option>
                                                <option value="scatter"> Scatter points </option>
                                                <option value="line"> Line </option>
                                            </select>
                                        </div>
                                    </div>
                            </div>
                            <div class="da-update-preview">
                                <button class="button"> Update Preview > </button>
                            </div>
                        </div>
                        <div class="one-half column">
                            <div class="da-column-header">
                                <h5> Preview </h5>
                            </div>
                            <div class="da-preview-canvas">
                                <p> Full Preview comes here! </p>
                            </div>
                        </div>
                    </div>
                    <!--   -->
                    <div class="row da-widget-main-controls">
                        <div class="twelve column">
                            <button class="button button-primary"> Save Widget </button>
                        </div>
                    </div>

                    <input type="hidden" name="_token" value="{{ csrf_token() }}">
                </form>    
            </div>

            <div class="two columns"> &nbsp; </div> <!-- hack to center cols -->
        </div>
    
@endsection
