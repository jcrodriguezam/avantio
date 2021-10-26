const router = require('express').Router();
const controller = require('./controllers/feeds.controller');

router.get('/', controller.getFeed);
router.get('/date/:dateAsString',controller.getFeed);
router.post('/', controller.postFeed);
router.patch('/id/:id', controller.patchFeed);
router.delete('/id/:id', controller.deleteFeed);
router.get('/load', controller.getData);

module.exports = router;