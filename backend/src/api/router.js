const router = require('express').Router();
const controller = require('./controllers/feeds.controller');

router.get('/', controller.getFeed);
router.get('/date/:dateAsString',controller.getFeed);
router.post('/', controller.postFeed);
router.patch('/date/:dateAsString/publisher/:publisher', controller.patchFeed);
router.delete('/date/:dateAsString/publisher/:publisher', controller.deleteFeed);

module.exports = router;