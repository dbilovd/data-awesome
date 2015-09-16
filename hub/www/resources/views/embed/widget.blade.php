<!DOCTYPE html>
<html>
	<head>
        <style>
            body {
                margin: 0;
                border: 1px solid #e7e7e7;
                border-radius: 2px;
                font-family: 'Fira Sans', sans-serif
            }

            .header,
            .content,
            .footer {
                padding: 10px;
            }
            
            .content {
                text-align: center;
            }
            
            .footer {
                background-color: #f7f7f7;
                border-top: 1px solid #e7e7e7;
                height: 20px;
            }
            
            .footer .left,
            .footer .right {
                width: 48%;
            }
            .footer .left {
                float: left;
            }
            .footer .right {
                float: right;
                text-align: right;
            }
        </style>
        <link href='https://fonts.googleapis.com/css?family=Fira+Sans' rel='stylesheet' type='text/css'>
        <link type="text/css" rel="stylesheet" href="{{ asset('css/app.graph.css') }}" />
	</head>
	<body>
		<div class="header">
			<h4> <?php echo $widget -> title; ?> </h4>
            <hr color="#efefef" />
		</div>
		<div class="content">
            <div id="canvas"></div>
		</div>
		<div class="footer">
            <div class="left">
                <a href="<?php echo route("widget", [ 'widget' => $widget -> id, 'username' => $owner -> name	]); ?>" 
                    target="_blank"> View on Datawesome </a>
            </div>
            <div class="right">
                <a href="#"> Share on twitter </a>
            </div>
		</div>
        
        <!-- script -->
        <input type="hidden" id="w_data_query" data-query="{{ $widget -> query }}" />
        <input type="hidden" id="w_data_file"  data-type="{{ $dataset -> ext }}" 
               value='{{ route("data-file",  [ "data_set" => $dataset -> id, "file_name" => $dataset -> file ] ) }}' />
        <script type="text/javascript" src="{{ asset('js/lib/iframeResizer.contentWindow.js') }}"></script>
        <script type="text/javascript" src="{{ asset('js/lib/require.js') }}"
                data-main="{{ asset('js/embed-chart') }}"></script>
	</body>
</html>