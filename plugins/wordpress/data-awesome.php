<?php


/*
 Plugin Name: Data Awesome
 Plugin URI : http://davidlartey.com/data-awesome
 Version : 0.0.1
 Author : David Lartey
 */


/**
 *
 *
 *
 *
 */
function dawesome_shortcode_view ( $attributes ) {
	// Get widget
	$widget_id = isset($attributes['widget']) ? $attributes['widget'] : 0;
	return "<div class='data-awesome-widget' data-widget-id='$widget_id'>
	</div>";
}

/**
 *
 *
 *
 *
 */
function dawesome_insert_footer_script () {
	echo '<script type="text/javascript">
        (function () {
            var script = document.createElement("script");
            script.src = "http://da-hub.local.dev/js/embed.js";
            script.async = true;

            var entry = document.getElementsByTagName("script")[0];
            entry.parentNode.insertBefore(script, entry);
        })();
    </script>';
}


/**
 * Shortcodes
 */
add_shortcode("dawesome", "dawesome_shortcode_view");

/**
 * Register actions/filters
 */
add_action("wp_footer", "dawesome_insert_footer_script");


?>
