
@extends("layouts.base")

@section("head.title", "Create Widget")

@section("body.main")

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

                <form id="widget-form" method="POST" action="" enctype="multipart/form-data">

                    <div class="row">
                        <div class="three columns">
                            <div class="da-column-header">
                                <h5> Configure </h5>
                            </div>
                            <div class="da-widget-graph-form">
                                <div class="row">
                                    <div class="one-third column">
                                        <label> Width </label>
                                        <input type="text" class="u-full-width" id="w-graph-width" name="w-graph-width" placeholder="in px" />
                                    </div>
                                    <div class="one-third column">
                                        <label> Height </label>
                                        <input type="text" class="u-full-width" id="w-graph-height" name="w-graph-height" placeholder="in px" />
                                    </div>
                                    <div class="one-third column">
                                        <label> Padding </label>
                                        <input type="text" class="u-full-width" id="w-graph-padding" name="w-graph-padding" placeholder="in px" />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="twelve columns">
                                        <label> Type of graph </label>
                                        <select name="w-graph-type" class="u-full-width" id="w-graph-type">
                                            <option value="bar"> Bar Graph </option>
                                            <option value="scatter"> Scatter points </option>
                                            <option value="line"> Line </option>
                                        </select>
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
                                    <button class="button button-primary u-pull-right"> Save Widget </button>
                                </div>
                            </div>
                            <div class="row">
                                <div class="twelve columns">
                                    <div id="da-preview-canvas" class="da-preview-canvas da-text-center">
                                        <!-- <svg height="200" width="400" style="border: 1px solid;">
                                            <circle cx="200" cy="100" r="50"> </circle>
                                        </svg> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <input type="hidden" name="_token" value="{{ csrf_token() }}">
                </form>    
            </div>

        </div>
    
@endsection

@section ("head.scripts")
    <script type="text/javascript" src="<?php echo asset("js/lib/require.js"); ?>" data-main="/js/main"></script>
@endsection
