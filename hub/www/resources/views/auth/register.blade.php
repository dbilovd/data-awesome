
@extends("layouts.base")

@section("head.title", "Join")


@section("body.subheader")
@endsection

@section("body.main")

    <div class="row">

        <div class="three columns"> &nbsp; </div> <!-- hack to center form -->
        <div class="six columns form-container">
            
            <h5> Create account </h5>

            <!-- TODO proper form error reporting -->
            <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
            </ul>
                            
            <form method="POST" action="{{ route('join_submit') }}">
            	{!! csrf_field() !!}

            	<div class="row">
                    <div class="twelve column">
                        <label> Username </label>
                        <input type="text" name="name" placeholder="Username" value="{{ old('name') }}" class="u-full-width" />
                    </div>
                </div>
                <div class="row">
                    <div class="twelve column">
                        <label> Email </label>
                        <input type="email" name="email" placeholder="your-email@adddress.com" value="{{ old('email') }}" class="u-full-width" />
                    </div>
                </div>
                <div class="row">
                	<div class="twelve column">
                        <label> Password </label>
                        <input type="password" name="password" placeholder="Password" class="u-full-width" />
                    </div>
                </div>
                <div class="row">
                	<div class="twelve column">
                        <label> Confirm Password </label>
                        <input type="password" name="password_confirmation" placeholder="Password" class="u-full-width" />
                    </div>
                </div>
                <div class="row">
                    <div class="twelve column">
                        <button class="button-primary" type="submit"> Create Account </button>
                        <a href="{{ route('signin') }}" style="float: right;"> Sign in </a>
                    </div>
                </div>

            </form>
        
        </div>

    </div>

@endsection
