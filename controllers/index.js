const express = require('express');
const config = require('../config');

const router = express.Router();
router.get('/', async (req, res, next) => {
    const result = {
        version: config.api.version,
    };

    res.json(result);
});

router.get('/health', async (req, res) => {
    res.sendStatus(200);
});


const multer  = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const storage = require('../helpers/storage');

// // Storage Test Only - TBD
// router.post('/upload', upload.array('files', 12),async (req, res) => {
//     try {
//         const result = await storage.uploadFiles(req.files);
//         res.json(result);
//     }catch (err) {
//         console.log(err);
//     }
// });

module.exports = router;
