
@extends("layouts.base")

@section("head.title", "Sign In")


@section("body.subheader")
@endsection


@section("body.main")

    <div class="row">

        <div class="three columns"> &nbsp; </div> <!-- hack to center form -->
        <div class="six columns form-container">
            
            <h5> Sign In </h5>
            
            <!-- TODO proper form error reporting -->
            <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
            </ul>
                            
            <form method="POST" action="{{ route("signin_submit") }}">
                {!! csrf_field() !!}

                <div class="row">
                    <div class="twelve column">
                        <label> Email </label>
                        <input type="email" name="email" placeholder="Email" value="{{ old('email') }}" class="u-full-width" />
                    </div>
                </div>
                <div class="row">
                    <div class="twelve column">
                        <label>
                            Password
                            <a style="float: right;" href="#"> Forgotten?</a>
                        </label>
                        <input type="password" name="password" placeholder="Password" class="u-full-width" />
                    </div>
                </div>
                <div class="row">
                    <div class="twelve column">
                        <label>
                            <input type="checkbox" name="remember" /> &nbsp;
                            Remember me
                        </label>
                    </div>
                </div>
                <div class="row">
                    <div class="twelve column">
                        <button class="button-primary" type="submit"> Sign In </button>
                        <a href="{{ route('join') }}" style="float: right;">
                            Create a new account
                        </a>
                    </div>
                </div>
            </form>
        
        </div>

    </div>

@endsection
