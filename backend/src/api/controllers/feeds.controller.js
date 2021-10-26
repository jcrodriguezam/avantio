const Feed = require('../models/feeds.model');
const feedsRepo = require('../repository/feeds.repository');

async function getFeed(req, res) {
  const { params } = req;
  let query = {}
  if (params) {
    const { dateAsString } = params;
    if (dateAsString) {
      query={dateAsString}
    }
  }
  const result = await feedsRepo.find(query)
  res.send({...result});
}

exports.getFeed = getFeed;

async function postFeed(req, res) {
  const { body } = req;
  const feed = feedsRepo.add(body)
  new Feed({...body});

  res.send(feed)
}

exports.postFeed = postFeed;

async function patchFeed(req, res) {
  const {body, params} = req;
  const { dateAsString, publisher} =  params;
  const newFeed = await feedsRepo.update({dateAsString, publisher}, {...body});
  res.send(newFeed)
}

exports.patchFeed = patchFeed;

async function deleteFeed(req, res) {
  const {params} = req;
  const { dateAsString, publisher} =  params;
  const newFeed = await feedsRepo.deleteFeed(dateAsString, publisher);
  res.send(newFeed)
}

exports.deleteFeed = deleteFeed;