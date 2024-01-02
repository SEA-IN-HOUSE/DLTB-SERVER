import multer  from 'multer'

const upload = multer({ dest: './public/data/uploads/' })

upload.single('avatar')

export default upload;