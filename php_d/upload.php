<?php

if(isset($_FILES['file'])){
    $errors = array();
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
                echo "<h3 style='color: green;'>Data Uploaded Successfully</h3>";
            }
        } catch(Exception $e) {
            print ($e);
        }
        
        $fullpath_f = realpath( $new_filename );
        $fullpath = realpath ( "uploads" );
        $exec_path = realpath("../r/generateGraph.R");

        $command = "Rscript {$exec_path} {$fullpath_f} {$fullpath}";

        // Get post of graph
        if (isset($_POST['graph'])) {
            $graph = $_POST['graph'];
            $command = $command . " " . $graph;

            // post colx
            if (isset($_POST['colx'])) {
                $colx = $_POST['colx'];
                $command = $command . " " . $colx;

                // post coly
                if (isset($_POST['coly'])) {
                    $coly = $_POST['coly'];
                    $command = $command . " " . $coly;
                } else {
                    $command = $command . " NULL";
                }
            }
        }

        # Execute
        # Final commmand should : Rscript [generateGraph.R] [data source] [output location] [type] [colX] [colY]
        // print($command);
        exec($command, $output);
        if (empty($output)) { ?>

            <h3 style="color: red;"> A error occured we couldn't process your data. <a href="upload.php"> Try again. </a> </h3>

<?php
        } else {

        // Image created
        $new_image = $output[0];
        // prepare file name
        $new_image = explode(" ", $new_image);
        $new_image = $new_image[1];
        // Remove " " at both ends of file name
        $new_image = str_replace('"', "", $new_image);
        $new_image_filename = basename($new_image);
        $base_path = "http://localhost/php_d/"
        ?>

        <h1> Your data has been uploaded. Here  is your graph </h1>
        <p> <img src='view.php?image=<?php echo $new_image_filename; ?>' width="500" /> </p>
        <h3> <a href="view.php?image=<?php echo $new_image_filename; ?>"> <?php echo $new_image_filename; ?> </a> </h3>
        <p style="color: red;">Copy the code in the box below and pase it in any of your news story or blog post. </p>
        <textarea rows="10" cols="50"><img src="<?php echo $base_path; ?>view.php?image=<?php echo $new_image_filename; ?>" width="250" height="auto" /></textarea>
<?php
        }

    } else {
        print_r($errors);
    }
}

?>

<?php if (!isset($_POST['submit'])) { ?>

    <form action="upload.php" method="POST" enctype="multipart/form-data">
        <div>
            <p> Data (JSON File) </p>
            <input type="file" name="file" />
        </div>
        <div>
            <p> Type of Graph (Optional) </p>
            <select name="graph">
                <option value="bar"> Bar Graph </option>
                <option value="line"> Line Graph </option>
            </select>
        </div>
        <!--
        <div>
            <p> X Axis (Optional) </p>
            <ul>
                <li>PS: The column matching this value with be plotted on the x axis and everything else plotted off it. </li>
                <li>PPS: This value should be a column name in your data. </li>
            </ul>
            <input type="text" name="colx" />
        </div>
        -->
        <!--
        <div>
            <p> Y Axis Label (Optional) </p>
            <input type="text" name="coly" />
        </div>
        -->
        <div>
            <p>
                <input type="submit" value="Generate Graph" name="submit" />
            </p>
        </div>
    </form>

<?php } else { ?>

<?php } ?>