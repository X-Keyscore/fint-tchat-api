const multer = require('multer');
const fs = require('fs')

createFile_avatar = (req, res) => {

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `public/avatars/`)
        },
        filename: (req, file, cb) => {
            // Jsp, Name file
            cb(null, file.originalname)
        }
    });

    const upload = multer({ storage }).array('file');

    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json(err)
        }
        // Le fichier a été upload avec succès
        return res.status(200).send(req.files)
    })

}

getFileById_avatar = async (req, res) => {
    var options = {
        root: 'public/avatars/'
    };

    // Chemin du fichier 'avatar' et lecture du fichier
    const dir = 'public/avatars/'
    const files = fs.readdirSync(dir)

    // Si "tofindAvatar" reste à zéro je renvoie l'avatar par défaut
    var tofindAvatar = 0

    // Je boucle les images
    for (const file of files) {
        // Je divise le nom de l'extension
        const fileId = file.split('.');

        // Je teste si l'id correspond a celle du nom
        if (req.params.id == fileId[0]) {
            tofindAvatar = 1
            return res.status(200).sendFile(file, options, function (err) {
                if (err) {
                    return res.status(500).json(err)
                } else {
                    // Le fichier a été envoyer avec succès
                }
            });
        }
    }
    if (tofindAvatar === 0) {
        return res.status(200).sendFile('default_avatar.png', options, function (err) {
            if (err) {
                return res.status(500).json(err)
            } else {
                // Le fichier a été envoyer avec succès
            }
        });
    }
}

deleteFileById_avatar = (req, res) => {
    // Chemin du fichier 'avatar' et lecture du fichier
    const dir = 'public/avatars/'
    const files = fs.readdirSync(dir)

    // Extensions disponibles
    const extensionTable = ['.jpg', '.jpeg', '.png', '.gif']
    // Je boucle toutes les extensions
    for (const extension of extensionTable) {
        if (files.find(element => element == `${req.params.id}${extension}`)) {
            // Suppression du fichier
            fs.unlink(`${dir}${req.params.id}${extension}`, function (err) {
                if (err) {
                    return res.status(500).json(err)
                } else {
                    // Le fichier a été supprimé avec succès
                }
            });
        }
    }
    return res.status(200).json({ success: true })
}

module.exports = {
    createFile_avatar,
    getFileById_avatar,
    deleteFileById_avatar
}
