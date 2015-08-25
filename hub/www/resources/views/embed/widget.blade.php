<!DOCTYPE html>
<html>
	<head>
		<title></title>
		<style>
		/*
		html, body {
			height: 100%;
		}
		body {
			height: 100%;
			width: 100%;
			padding: 0;
			margin: 0;
		}
		h3 {
			margin: 3px 0;
			font-weight: bold;
		}
		/* Widget style *\/
		.main {
			height: 100%;
			/*border: 1px solid #000000;*/
			/*border-radius: 5px;*\/
		}
		.main > div {
			padding: 10px;
		}

		.half {
			width: 48%;
			display: inline-block;
		}
		.txt-left {
			text-align: left;
		}
		.txt-right {
			text-align: right;
		}*/
		.header, .content, .footer {
			position: absolute;
			left: 0;
			right: 0;
		}
		.header {
			height: 49px;
			background-color: gray;
			border-bottom: 1px solid;
			top: 0;
		}
		.content {
			top: 49px;
			bottom: 49px;
			overflow: auto;
		}
		.footer {
			height: 49px;
			background-color: gray;
			border-top: 1px solid;
			bottom: 0;
		}
		</style>
	</head>
	<body>
		<div class="header">
			<h4> <?php echo $widget -> title; ?> </h4>
		</div>
		<div class="content">
			<img src="<?php echo route("get-embed-widget-image", [ "widget_id" => $widget -> id ]); ?>" width="100%" >
		</div>
		<div class="footer">
			<a href="<?php echo route("widget", [ 'widget' => $widget -> id, 'username' => $owner -> name	]); ?>" 
					target="_blank">
					View on Datawesome
			</a>
			<a href="#"> Share on twitter </a>
		</div>
	</body>
</html>