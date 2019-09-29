// Imports
const express = require('express');
const app = express();
const fs = require('fs');
const multer = require('multer');
const { TesseractWorker } = require('tesseract.js');
const worker = new TesseractWorker();

//6:09: Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    }
});
const upload = multer({storage: storage}).single('avatar'); //7:19

//8:45
app.set('view engine', 'ejs');

//14:53 Routes
app.get('/', (req, res) => {
    res.render('index'); //15:24: i.e. views/index.js
});

//16:10
app.post('/upload', (req, res) => {
    upload(req, res, err => {
        console.log(req.file);
    });
});

//10:10
// app.get('/uploads', (req, res) => {
//     console.log('uploads');
// });

//11:46: Start up our server
const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => console.log(`Lestening on port ${PORT}`));
