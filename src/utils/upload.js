import multer from "multer";
import { v4 as uuidv4 } from 'uuid'
import { AppError } from "./error.js"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') cb(null, true);
    else cb(new AppError('pdfs Only', false))
}

const upload = multer({ storage: storage, fileFilter: fileFilter })

export default upload 