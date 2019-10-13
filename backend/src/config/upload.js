const multer = require('multer');
const path = require('path');

module.exports = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      let name = path.basename(file.originalname, ext);

      name = name.replace(/ /g, '');

      cb(null, `${name}-${Date.now()}${ext}`);
    },
  }),
};
