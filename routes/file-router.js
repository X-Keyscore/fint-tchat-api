const express = require('express')

const FileCtrl = require('../controllers/file-ctrl')

const router = express.Router()

router.post('/file_avatar', FileCtrl.createFile_avatar)

router.get('/file_avatar/id/:id', FileCtrl.getFileById_avatar)

router.delete('/file_avatar/id/:id', FileCtrl.deleteFileById_avatar)

module.exports = router