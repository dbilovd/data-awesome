
@extends("layouts.base")

@section("head.title", "Create Dataset")


@section("body.subheader")
@endsection


@section("body.main")

    <div class="row">
        
        <div class="one columns"> &nbsp; </div> <!-- hack to center form -->
        <div class="ten columns form-container">
            
            <h5> Create Dataset </h5>
            
            <!-- TODO proper form error reporting -->
            <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
            </ul>
            
            <form method="POST" action="{{ route('create-dataset-post') }}" enctype="multipart/form-data">
                {!! csrf_field() !!}

                <div class="row">
                    <div class="twelve column">
                        <label>
                            Datafile
                            <span class="form-help"> Upload a .json file containing your data.</span>
                        </label>
                        <input type="file" name="ds-file" class="u-full-width" />
                    </div>
                </div>
                <div class="row">
                    <div class="twelve column">
                        <label>
                            Name for Url
                            <span class="form-help"> 
                                Short and memorable text so people can access your project at <em> your-username/my-awesome-dataset</em> 
                            </span>
                        </label>
                        <input type="text" name="ds-name" placeholder="my-awesome-dataset" value="{{ old('ds-name') }}" />
                    </div>
                </div>
                <div class="row">
                    <div class="twelve column">
                        <label>
                            Title
                            <span class="form-help">
                                The last one had to be short and memorable but this doesn't. Give a name that describes your project.
                            </span>
                        </label>
                        <input type="text" name="ds-title" placeholder="My Very Awesome Dataset" class="u-full-width" value="{{ old('ds-title') }}" />
                    </div>
                </div>
                <div class="row">
                    <div class="twelve column">
                        <label>
                            Description
                            <span class="form-help">
                                Tell the world how awesome your project is.
                            </span>
                        </label>
                        <textarea name="ds-description" class="u-full-width" value="{{ old('ds-description') }}" ></textarea>
                    </div>
                </div>
                <div class="row">
                    <div class="twelve column">
                        <button class="button-primary" type="submit"> Upload Dataset </button>
                    </div>
                </div>
            </form>

        </div>
    </div>

@endsection
