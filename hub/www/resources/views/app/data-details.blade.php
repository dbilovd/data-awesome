
@extends("layouts.base")

@section("head.title", $dataset -> title)


@section("body.main")

    <div class="row">

        <h4>
            <a href="<?php echo route("profile", ["username" => $owner -> name ]); ?>">
                <?php echo $owner -> name; ?>
            </a>
            /
            <a href="<?php echo route("dataset", ["username" => $owner -> name, "dataset" => $dataset -> name ]); ?>">
                <?php echo $dataset -> name; ?>
            </a>
        </h4>

        <h3> <?php echo $dataset -> title; ?> </h3>

        <?php echo $dataset -> description ? "<p>" . $dataset -> description . "</p>" : ""; ?>
        
        <hr />

        <h5>
            
            <?php echo "" . $dataset -> file; ?>

        </h5>

    </div>
    
@endsection
