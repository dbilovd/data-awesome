<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="../html/main.css">
    <link rel="stylesheet" type="text/css" href="../html/animate.css">
    <link rel="stylesheet" type="text/css" href="../html/bootstrap/css/bootstrap.css">
    <link href="//fonts.googleapis.com/css?family=Roboto:400,100,400italic,700italic,700" rel="stylesheet" type="text/css">

</head>
<body class="grid">
    <header class="animated bounceInDown" style="color:#F35626">
        <h1>Welcome to data awesome.</h1>
        <p>Upload your data to make it awesome</p>
    </header>
    <body>
        <section>

            <?php if (!isset($_POST['submit'])) { ?>

                <!--
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
                    --
                    <div>
                        <p>
                            <input type="submit" value="Generate Graph" name="submit" />
                        </p>
                    </div>
                </form>
                -->

                <form action="upload.php" method="POST" enctype="multipart/form-data">
                    <div class="well">

                        <div class="form-group">
                            <label> Data (JSON File) </label>
                            <input type="file" name="file" class="bnt btn-default form-control" />
                        </div>
                        <br /><hr style="border-size: 5px;" />
                        <div class="form-group">
                            <label> Type of Graph (Optional) </label>
                            <select name="graph" class="form-control">
                                <option value="bar"> Bar Graph </option>
                                <option value="line"> Line Graph </option>
                            </select>
                        </div>
                        <!--
                        <br />
                        <div>
                            <p> X Axis (Optional) </p>
                            <ul>
                                <li>PS: The column matching this value with be plotted on the x axis and everything else plotted off it. </li>
                                <li>PPS: This value should be a column name in your data. </li>
                            </ul>
                            <input type="text" name="colx" class="btn btn-default" />
                        </div>
                        <!--
                        <div>
                            <p> Y Axis Label (Optional) </p>
                            <input type="text" name="coly" />
                        </div>
                        -->
                        <br /><hr style="border-size: 5px;" />
                        <div>
                            <p>
                                <input type="submit" value="Generate Graph" name="submit" class="btn btn-default" />
                            </p>
                        </div>
                    </div>
                </form>

            <?php } else { ?>

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
                            if ($uploaded) { ?>

                                <div class="alert alert-info alert-dismissable">
                                    Data Uploaded Successfully
                                </div>

                        <?php
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
                        
                            <div class="alert alert-danger alert-dismissable">
                                <h3 class="text-danger"> A error occured we couldn't process your data. <a href="upload.php"> Try again. </a> </h3>
                            </div>

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

                        <div class="alert alert-info alert-dismissable">
                            Your data has been uploaded. Here  is your graph.
                        </div>

                        <div class="well">
                            <p> <img src='view.php?image=<?php echo $new_image_filename; ?>' width="100%" /> </p>
                            <a href="view.php?image=<?php echo $new_image_filename; ?>"> <?php echo $new_image_filename; ?> </a>
                        </div>
                        <div class="well">
                            <p class="text-info">Copy the code in the box below and pase it in any of your news story or blog post. </p>
                            
                            <textarea rows="5" cols="50" class="form-control"><img src="<?php echo $base_path; ?>view.php?image=<?php echo $new_image_filename; ?>" width="250" height="auto" /></textarea>
                        </div>
                        <br /><br /><br />
                <?php
                        }

                    } else {
                        print_r($errors);
                    }
                }

                ?>
            <?php } ?>

        </section>
    </body>
</html>