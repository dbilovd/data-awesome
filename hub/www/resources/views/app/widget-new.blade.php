<!DOCTYPE html>
<html>
    <head>
        <title>Create new Widget</title>
    </head>
    <body>
        <h1> Create New Widget </h1>

        <form method="POST" action="/hub/www/public/index.php/widgets" enctype="multipart/form-data">
            <!--<div><input type="text" name="widget-title" placeholder="Title" /></div>
            <div><textarea name="data-description" placeholder="Description"></textarea></div>-->
            <div>
                <label> Data Source: </label>
                <select name="widget-data">
                    <?php foreach ($data_sets as $data_set) { ?>
                        <option value="<?php echo $data_set -> id; ?>"> 
                            <?php echo (($data_set -> title) ? $data_set -> title : $data_set -> id ) ?>
                        </option>
                    <?php } ?>
                </select>
            </div>
            <div>
                <label>Type of Graph:</label>
                <select name="widget-query-graph">
                    <option value="bar"> Bar Graph </option>
                    <option value="line"> Line Graph </option>
                </select>
            </div>
            <div><input type="submit" value="Create Wdiget" >
            <input type="hidden" name="_token" value="{{ csrf_token() }}"></div>
        </form>
    </body>
</html>
