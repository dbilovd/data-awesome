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
	</head>
	<body>
		<div class="header">
            <h5> Widget with id {{ $widget_id }} not found. </h5>
		</div>
		<div class="footer">
            <div class="left">
                <a href="<?php echo route("home"); ?>" target="_blank"> Datawesome </a>
            </div>
		</div>
	</body>
</html>