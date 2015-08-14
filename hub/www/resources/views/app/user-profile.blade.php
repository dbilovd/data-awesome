
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

        <hr />

        <h3> Widgets </h3>

        <ul>
        
            <?php foreach ($widgets as $widget) : ?>

                <li>
                    <h4>
                        <a href="<?php echo route("widget", ["username" => $user -> name, "widget" => $widget -> id ]); ?>">
                            <?php echo $widget -> title; ?>
                        </a>
                    </h4>
                </li>

            <?php endforeach;  ?>
        </ul>

    </div>
    
@endsection
