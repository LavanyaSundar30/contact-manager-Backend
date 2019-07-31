const express = require('express');
const router = express.Router();
const server = express();

const fileController = require('./../controller/upload');
let multer       = require('multer');
global.upload    = multer({dest: 'uploads/'});
server.use('/uploads', express.static('uploads'));

router.post('/upload',upload.single('photo'), async (req, res) => {

    try{
        let response = await fileController.saveFilepath(req.file);
        res.send(response);
    } catch(err) {
        console.log(err);
        res.status(500).send(JSON.stringify({status:'error', 'message':err.message}));
    }
});

router.get('/list', async (req, res) => {
    try{
        let response = await taskController.list(req.query);
        res.send({status: 'success', result: response});
    } catch(err) {
        console.log(err);
        res.status(500).send(JSON.stringify({status:'error', 'message':err.message}));
    }
})


// router.post('/import/:type', upload.single('file'), async (req, res) =>{
//     try{
//         let response = await taskController.import(req.file, res);
//         res.send(response);
//     } catch(err) {
//         console.log(err);
//         res.status(401).send(JSON.stringify({status:'error', 'message':err.message}));
//     }
// })

module.exports = router;