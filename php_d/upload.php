<?php

if(isset($_FILES['file'])){
    $errors= array();
    $file_name = $_FILES['file']['name'];
    $file_size =$_FILES['file']['size'];
    $file_tmp =$_FILES['file']['tmp_name'];
    $file_type=$_FILES['file']['type'];   
    $file_ext=strtolower(end(explode('.',$_FILES['file']['name'])));
    $extensions = array("txt","xlsx","csv","json","pdf");
    if(in_array($file_ext,$extensions )=== false){
     $errors="extension not allowed, please choose a Txt, Exccel or csv file.";
    }
    if($file_size > 2097152){
        $errors[]='File size must be excately 2 MB';
    }

    if(empty($errors)==true){

        try {
            $new_filename = "uploads/" . $file_name;
            $uploaded = move_uploaded_file($file_tmp, $new_filename);
            if ($uploaded) {
                echo "Uploaded successful";
            }
        } catch(Exception $e) {
            print ($e);
        }
        
        $fullpath_f = realpath( $new_filename );
        $fullpath = realpath ( "uploads" );
        $exec_path = realpath("../r/generateGraph.R");

        $command = "Rscript {$exec_path} {$fullpath_f} {$fullpath} bar";

        exec($command, $output);

        // Image created
        $new_image = $output[0];
        // prepare file name
        $new_image = explode(" ", $new_image);
        $new_image = $new_image[1];        
        // Remove " " at both ends of file name
        $new_image = str_replace('"', "", $new_image);
        $new_image_filename = basename($new_image);
        print "See your <a href='view.php?image={$new_image_filename}'> {$new_image_filename} </a>";
        
    }else{
        print_r($errors);
    }
}

?>
<form action="upload.php" method="POST" enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="submit"/>
</form>