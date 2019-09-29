const express = require('express');
const app = express();
const fs = require('fs');
const multer = require('multer');
const { TesseractWorker } = require('tesseract.js');
const worker = new TesseractWorker();

//6:09
const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, '/uploads');
    },
    filename: (req, res, cb) => {
        cb(null, req.file);
    }
});

//7:19
const upload = multer({storage: storage}).single('avatar');

//8:45
app.set('view engine', 'ejs');

//10:10
app.get('/uploads', (req, res) => {
    console.log('uploads');
})

//11:46: Start up our server
const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => console.log(`Lestening on port ${PORT}`));
