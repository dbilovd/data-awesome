<!DOCTYPE html>
<html>
    <head>
        <title> @yield('head.title') : Data-Awesome </title>
        <link href="<?php echo asset("css//skeleton.css"); ?>" rel="stylesheet" type="text/css" />
        <link href="<?php echo asset("css/normalize.css"); ?>" rel="stylesheet" type="text/css" />
        <link href="<?php echo asset("css/app.css"); ?>" rel="stylesheet" type="text/css" />

    </head>
    <body>
        
        @section("body.header")
            <nav>
                <div class="container">
                    <div class="row">
                        <div class="three columns">
                            <h5> Data Awesome Hub </h5>
                        </div>
                        <div class="nine columns" style="text-align: right">
                            <h6>
                                <a href="<?php echo route("create-dataset"); ?>"> 
                                    + Dataset
                                </a> &nbsp;&nbsp;
                                <a href="<?php echo route("create-widget"); ?>">
                                    + Widget 
                                </a> &nbsp;&nbsp;
                                <a href="<?php echo route("profile", Auth::user() -> name); ?>">
                                    <?php echo Auth::user() -> name; ?>
                                </a>
                            </h6>
                        </div>
                    </div>
                </div>
            </nav>
        @show
        
        <div class="container">
            <!-- widget -->
            <div class="da-widget">

                @section("body.main")

                    <div class="row">
                        <div class="one-half column">
                            <div class="da-column-header">
                                <h5> Configure </h5>
                            </div>
                            <div class="da-widget-form">
                                <form>
                                    <div class="row">
                                        <div class="twelve columns">
                                            <label> Type of graph </label>
                                            <select class="u-full-width" id="graph-type">
                                                <option value="bar"> Bar Graph </option>
                                                <option value="scatter"> Scatter points </option>
                                                <option value="line"> Line </option>
                                            </select>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="da-update-preview">
                                <button class="button"> Update Preview > </button>
                            </div>
                        </div>
                        <div class="one-half column">
                            <div class="da-column-header">
                                <h5> Preview </h5>
                            </div>
                            <div class="da-preview-canvas">
                                <p> Full Preview comes here! </p>
                            </div>
                        </div>
                    </div>
                    <!--   -->
                    <div class="row da-widget-main-controls">
                        <div class="twelve column">
                            <button class="button button-primary"> Save </button>
                            <button > Cancel </button>
                        </div>
                    </div>

                @show

            </div>
        </div>

    </body>
</html>