
@extends("layouts.base")

@section("head.title", "Widget Embed Codes")


@section("body.subheader")

    <div class="sub-navbar">
        <div class="container">
            <div class="row">
                <div class="twelve columns">
                    <h5>
                        <a href='{{ route("profile", ["username" => $owner -> name ]) }}'>{{ $owner -> name }}</a> 
                        /
                        <a href="{{ route("widgets", ["username" => $owner -> name]) }}">Widgets</a>
                        /
                        <a href="{{ route("widget", ["username" => $owner -> name, "widget" => $widget -> id ]) }}">
                            {{ $widget -> title }}
                        </a>

                        <span style="float: right;">
                            <a class="button" href="{{ route('edit-widget-graph', [ 'widget' => $widget -> id ]) }}"> 
                                Edit graph 
                            </a>
                        </span>
                    </h5>
                </div>
            </div>
        </div>
    </div>

@endsection


@section("body.main")

    <div class="row">
        <div class="twelve columns">

            <div class="row">
                <div class="twelve columns">
                    <h5> Embed as a Javascript Library </h5>

                    <div id="embed-code-js">
<pre><code><?php echo htmlspecialchars('<div class="data-awesome-widget" data-widget-id="' . $widget -> id .'"> </div>'); ?></code></pre>

<pre><code>(function () {
    var script = document.createElement("script");
    script.src = "<?php echo url("/"); ?>/js/embed.js";
    script.async = true;

    var entry = document.getElementsByTagName("script")[0];
    entry.parentNode.insertBefore(script, entry);
})();
</code></pre>
                    </div>
                </div>
            </div>
            <hr />

            <div class="row">
                <div class="twelve columns">
                    <h5> Embed into Wordpress </h5>
                    <div id="embed-code-iframe">
<pre><code>[dawesome widget="{{ $widget -> id }}" ]
</code></pre>
                    </div>
                </div>
            </div>
            <hr />

            <div class="row">
                <div class="twelve columns">
                    <h5> Embed as an Image </h5>
                    <div id="embed-code-img">
                        <pre><code>Embed as an Image</code></pre>
                    </div>
                </div>
            </div>
            <hr />

            <div class="row">
                <div class="twelve columns">
                    <h5> Embed iFrame </h5>
                    <div id="embed-code-iframe">
                        <pre><code>Copy iFrame directly</code></pre>
                    </div>
                </div>
            </div>
            
        </div>
    </div>

@endsection
