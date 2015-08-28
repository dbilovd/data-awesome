
@extends("layouts.base")

@section("head.title", "Create Dataset")


@section("body.subheader")
@endsection


@section("body.main")

    <div class="row">
        
        <div class="one columns"> &nbsp; </div> <!-- hack to center form -->
        <div class="ten columns form-container">
            
            <h5> Create a Widget </h5>
            
            <!-- TODO proper form error reporting -->
            <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
            </ul>
            
            <form method="POST" action="{{ route('create-widget-post') }}" enctype="multipart/form-data">
                {!! csrf_field() !!}
                
                <div class="row">
                    <div class="twelve column">
                        <label>
                            Dataset
                            <span class="form-help"> Choose the data this widget would visualise. </span>
                        </label>
                        
                        <select name="w-data">
                            <option> Select a Dataset names </option>

                            @foreach ($data_sets as $dataset)

                                <option value="{{ $dataset -> id }}"
                                    @if (old('w-data') == $dataset -> id) 
                                        selected="selected"
                                    @endif
                                >
                                    {{ $dataset -> title }}
                                </option>

                            @endforeach
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="twelve column">
                        <label>
                            Title
                            <span class="form-help">
                                Describe your widget in a few words.
                            </span>
                        </label>
                        <input type="text" name="w-title" placeholder="Proof of how awesome our data is" value="{{ old('w-title') }}" class="u-full-width" />
                    </div>
                </div>
                <div class="row">
                    <div class="twelve column">
                        <button class="button-primary" type="submit"> Save Widget </button>
                    </div>
                </div>
            </form>

        </div>
    </div>


@endsection
