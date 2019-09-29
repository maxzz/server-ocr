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
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({storage: storage}).single('avatar'); //7:19

//8:45
app.set('view engine', 'ejs');
app.use(express.static('public')); //25:49

//14:53 Routes
app.get('/', (req, res) => {
    res.render('index'); //15:24: i.e. views/index.js
});

//16:10
app.post('/upload', (req, res) => {
    upload(req, res, err => {
        if (err) {
            console.log(`tm: upload error`, err);
            return;
        }
        //console.log(req.file);
        fs.readFile(`./uploads/${req.file.originalname}`, (err, data) => {
            if (err) {
                console.log(`tm: read error`, err);
                return;
            }

            worker
                .recognize(data, 'eng', {tessjs_create_pdf: '1'})
                .progress(progress => {
                    console.log(`progress `, progress);
                })
                .then(result => {
                    console.log('tesseract redirect');
                    //res.send(result.text);
                    res.redirect('/download');
                })
                .catch(err => {
                    console.log(`tm: tesseract error`, err);
                })
                .finally(() => {
                    console.log('tesseract done');
                    worker.terminate();
                }); // 22:23
        });
    });
});

//23:52
app.get('/download', (req, res) => {
    const filename = `${__dirname}/tesseract.js-ocr-result.pdf`;
    res.download(filename);
});

//10:10
// app.get('/uploads', (req, res) => {
//     console.log('uploads');
// });

//11:46: Start up our server
const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => console.log(`Lestening on port ${PORT}`));
