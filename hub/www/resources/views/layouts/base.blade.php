<!DOCTYPE html>
<html>
    <head>
        <title> @yield('head.title') : Data-Awesome </title>

        <!-- Stylesheets -->
        <!-- <link rel="stylesheet" type="text/css" href="<?php  echo asset("css/bootstrap.css"); ?>"> -->
        <link href="<?php echo asset("css/skeleton.css"); ?>" rel="stylesheet" type="text/css" />
        <link href="<?php echo asset("css/normalize.css"); ?>" rel="stylesheet" type="text/css" />
        <!-- fonts and icons-->
        <link href='https://fonts.googleapis.com/css?family=Fira+Sans' rel='stylesheet' type='text/css'>
        <link href="<?php echo asset("css/fa/css/font-awesome.min.css"); ?>" rel="stylesheet" type="text/css" />
        <!-- custom styles -->
        <link href="<?php echo asset("css/app.graph.css"); ?>" rel="stylesheet" type="text/css" />
        <link href="<?php echo asset("css/app.css"); ?>" rel="stylesheet" type="text/css" />

        <!-- scripts -->
        @section ("head.scripts")
        @show

    </head>
    <body>

        <div class="main">

            @section("body.header")

                <nav class="navbar">
                    <div class="container">
                        <div class="row">
                            <div class="three columns">
                                <h5>
                                    <a href="/">
                                        DA Hub
                                    </a>
                                </h5>
                            </div>
                            <div class="nine columns" style="text-align: right">
                                <ul class="menu">

                                    @if (Auth::check())

                                        <li class="menu-item">
                                            <a href="<?php echo route("create-dataset"); ?>" title="Upload a new data set">
                                                <i class="fa fa-plus fa-fw"></i> Dataset
                                            </a>
                                        </li>
                                        <li class="menu-item">
                                            <a href="<?php echo route("create-widget"); ?>" title="Create a new widget">
                                                <i class="fa fa-plus fa-fw"></i> Widget
                                            </a>
                                        </li>
                                        <li class="menu-item menu-divider"></li>
                                        <li class="menu-item">
                                            <a href="<?php echo route("profile", Auth::user() -> name); ?>" title="View Profile">
                                                <i class="fa fa-user fa-fw"></i> <?php echo Auth::user() -> name; ?>
                                            </a>
                                        </li>
                                        <li class="menu-item">
                                            <a href="{{ route('signout') }}" title="Logout">
                                                <i class="fa fa-sign-out fa-fw"></i>
                                            </a>
                                        </li>

                                    @else

                                        <li class="menu-item">
                                            <a href="{{ route('signin') }}" title="Sign In">
                                                Sign In
                                            </a>
                                        </li>
                                        <li class="menu-item">
                                            <a href="{{ route('join') }}" title="Create an Account">
                                                Create an Account
                                            </a>
                                        </li>

                                    @endif

                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>

            @show

            @section("body.subheader")

                <div class="sub-navbar">
                    <div class="container">
                        <div class="row">
                            <div class="twelve columns">
                                <h5>
                                    <a href="#">username</a> / <a href="#">current location</a>
                                 </h5>
                            </div>
                        </div>
                    </div>
                </div>

            @show

            <div class="content">
                <div class="container">

                    @section("body.main")

                    @show

                </div>
            </div>

            <div class="clear"> &nbsp; </div>
        </div>

        <!-- Footer -->
        @section("body.footer")
            <footer>
                <div class="container">
                    <ul class="menu">
                        <li class="menu-item">
                            <a href="#"> About </a>
                        </li>
                        <li class="menu-item">
                            <a href="#"> Contact </a>
                        </li>
                        <li class="menu-item">
                            <a href="#"> Open-Source </a>
                        </li>
                        <li class="menu-item">
                            <a href="#"> Privacy </a>
                        </li>
                    </ul>
                </div>
            </footer>

        @show


        <!-- Scripts -->
        <!--
        <script type="text/javascript" src="<?php echo asset("js/bootstrap.js"); ?>"></script>
        -->
        <script type="text/javascript" src="<?php echo asset("js/lib/jquery-1.11.2.js"); ?>"></script>
        <script type="text/javascript" src="<?php echo asset("js/clipboard.js"); ?>"></script>
        <script type="text/javascript">
        var clipboard = new Clipboard(".btn.clip", {
            text : function (trigger) {
                return $(trigger).parent().find("code").first().text();
            }
        });
        // Events
        clipboard.on("success", function (e) {
            $(e.trigger).text("Copied!");
            window.setTimeout(function (trigger) {
                $(trigger).text("Copy to Clipboard");
            }, 2000, e.trigger);
        });
        clipboard.on("error", function (e) {
            $(e.trigger).text("Copying Failed. Try later.");
            window.setTimeout(function (trigger) {
                $(trigger).text("Copy to Clipboard");
            }, 2000, e.trigger);
        });
        </script>
    </body>
</html>
