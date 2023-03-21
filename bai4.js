const express = require("express");
const app = express();
const port = 8080;
const bodyParser = require("body-parser");
const multer = require("multer");

app.use(bodyParser.urlencoded({ extended: true }));

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },

  filename: function (req, file, cb) {
    let fileName = file.originalname;
    console.log(fileName);

    let arr = fileName.split(".");
    let newFileName = arr[0] + "-" + Date.now() + "-" + arr[1];

    cb(null, newFileName);
  },
});
const maxSize = 1 * 1024 * 1024;
var upload = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("myFile");

app.post("/uploadfile", (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.send('File lớn hơn 1MB');
    } else if (err) {
      return res.send('File không xác định');
    }
  res.send('Thành công');
  console.log(req.file);
  })

});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/bai4.html");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
