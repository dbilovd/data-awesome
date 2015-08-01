<?php

if (isset($_GET['image'])) {
	$image = $_GET['image'];
	$uploads_folder = "uploads";

	$image_path = realpath($uploads_folder . "/" . $image);
	// print $image_path;
	if (file_exists($image_path)) {
		// Set header
		header("Content-Type: image/png");
		readfile($image_path);
		exit();
	}

	// 404
	echo "404 file not found error: '" . $image_path . "'";

} else {
	echo "<h1 style='color: red;'> Image: missing. Check your url. </h1>";
}

?>