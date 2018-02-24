const offersRoute = require(`./offers`);
const {Router} = require(`express`);
const multer = require(`multer`);

const router = new Router();
const upload = multer({dest: `uploads/`});

router.get(`/`, (req, res) => res.send(`Hello World!`));

// API
router.get(`/api/offers`, offersRoute.all);
router.get(`/api/offers/:date`, offersRoute.date);
router.get(`/api/offers/:date/avatar`, offersRoute.avatar);

router.post(`/api/offers`, upload.single(`avatar`), offersRoute.save);

module.exports = router;
