
@extends("layouts.base")

@section("head.title", $user -> name)

@section("body.main")

    <div class="row">

        <h3> <?php echo $user -> name; ?> </h3>

        <hr />

        <h3> Datasets </h3>

        <ul>
        
            <?php foreach ($datasets as $dataset) : ?>

                <li>
                    <h4>
                        <a href="<?php echo route("dataset", ["username" => $user -> name, "dataset" => $dataset -> name ]); ?>">
                            <?php echo $dataset -> name; ?>
                        </a>
                    </h4>
                </li>

            <?php endforeach;  ?>
        </ul>

    </div>
    
@endsection
