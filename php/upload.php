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
        move_uploaded_file($file_tmp,"uploads/".$file_name);
        echo "Success";
    }else{
        print_r($errors);
    }
}
?>
<form action="upload.php" method="POST" enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="submit"/>
</form>