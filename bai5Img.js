const express = require('express')
const app = express()
const port = 8080
const bodyParser = require('body-parser')
const multer = require('multer');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }))

var Imagestorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },

    filename: function (req, file, cb) {
        const fileExt = path.extname(file.originalname);
        const fileName = path.basename(file.originalname, fileExt);
        cb(null, `${fileName}-${Date.now()}.jpeg`);
    }
})
var uploads = multer({
    storage: Imagestorage,
  }).single('myImage');
  
  app.post("/upload/photo",(req, res) => {
    uploads(req, res, function (err) {
      res.send('Thành công');
      console.log(req.file);
    })
  });

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/bai5Img.html');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});