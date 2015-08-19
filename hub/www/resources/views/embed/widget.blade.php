<!DOCTYPE html>
<html>
	<head>
		<title></title>
		<style>
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
		/* Widget style */
		.main {
			height: 98%;
			border: 1px solid #000000;
			border-radius: 5px;
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
		}
		</style>
	</head>
	<body>
		<div class="main">
			<div style="border-bottom: 1px solid black;"> 
				<h3> <?php echo $widget -> title; ?> </h3>
			</div>
			<div>
				<div>
					<img src="<?php echo asset("img/test.png"); ?>" width="100%" />
				</div>
			</div>
			<div style="
				border-top: 1px solid black;
				position : fixed;
				left: 0;
				bottom: 0;
				width: 100%;
			">
				<!-- <div class="half txt-left"> -->
					<a href="<?php echo route("widget", [ 'widget' => $widget -> id, 'username' => $owner -> name	]); ?>" 
						target="_blank">
						View on Datawesome
					</a>
				<!-- </div> -->
				<!-- <div class="half txt-right" style="float: right;"> -->
					<a href="#"> Share on twitter </a>
				<!-- </div> -->
			</div>
		</div>
	</body>
</html>