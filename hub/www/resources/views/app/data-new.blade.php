<!DOCTYPE html>
<html>
    <head>
        <title>Upload new Data Set</title>
    </head>
    <body>
        <h1> Create New Data Set </h1>

        <form method="POST" action="" enctype="multipart/form-data">
            <div><input type="text" name="data-title" placeholder="Title" /></div>
            <div><textarea name="data-description" placeholder="Description"></textarea></div>
            <div><input type="file" name="data-file" /></div>
            <div><input type="submit" value="Upload Data Set" >
            <input type="hidden" name="_token" value="{{ csrf_token() }}"></div>
        </form>
    </body>
</html>
