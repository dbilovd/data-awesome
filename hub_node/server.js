var express = require('express');
var multer  = require('multer');


var upload = multer({
  // dest: 'uploads/',
  storage : multer.diskStorage({
    destination : function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename : function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    }
  })
});

var app = express();

app.use('/', express.static(__dirname + '/'));

app.get('/profile', function (req, res, next) {
  res.send('<form id="uploadForm" enctype="multipart/form-data" action="/profile" method="post">'+
    '<input type="file" name="userPhoto" />' +
    '<input type="submit" value="Upload Image" name="submit">' +
    '</form>'
  );
});

app.post('/profile', upload.single('userPhoto'), function (req, res, next) {
  // req.file is the `avatar` file
  console.log(req.file);
  // req.body will hold the text fields, if there were any
  res.send('<h1> Uploaded successfully </h1>' +
    '<img src="/' + req.file.path + '" />'
  )
});

app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
});

var cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
app.post('/cool-profile', cpUpload, function (req, res, next) {
  // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
  //
  // e.g.
  //  req.files['avatar'][0] -> File
  //  req.files['gallery'] -> Array
  //
  // req.body will contain the text fields, if there were any
});

app.listen(3000, function() {
  console.log("App started. Listening on port 3000");
});