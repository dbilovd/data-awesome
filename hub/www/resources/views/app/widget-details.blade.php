
@extends("layouts.base")

@section("head.title", "Widgets by " . $owner -> name)


@section("body.main")

    <div class="row">

        <h4>
            <a href="<?php echo route("profile", ["username" => $owner -> name ]); ?>">
                <?php echo $owner -> name; ?>
            </a>
            /
            <a href="<?php echo route("widget", ["username" => $owner -> name, "widget" => $widget -> id ]); ?>">
                <?php echo $widget -> title; ?>
            </a>

        </h4>

    </div>
    
@endsection
