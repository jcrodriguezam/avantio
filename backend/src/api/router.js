const router = require('express').Router();
const controller = require('./controllers/feeds.controller');

router.get('/', controller.getFeed);
router.get('/date/:dateAsString', controller.getFeed);
router.post('/', controller.postFeed);
router.patch('/:id', controller.patchFeed);
router.delete('/:id', controller.deleteFeed);

module.exports = router;