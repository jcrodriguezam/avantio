const Feed = require('../models/feeds.model');
const feedsRepo = require('../repository/feeds.repository');
const webScrap = require('../services/webScrap');

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
  const { id } =  params;
  const newFeed = await feedsRepo.update(id, {...body});
  res.send(newFeed)
}

exports.patchFeed = patchFeed;

async function deleteFeed(req, res) {
  const {params} = req;
  const { id } =  params;
  const newFeed = await feedsRepo.setDeleted(id);
  res.send(newFeed)
}

exports.deleteFeed = deleteFeed;

async function getData(req, res) {
  const ws = await webScrap.getData();
  ws.forEach(async (article) => {
    const oldArticle = await feedsRepo.find({id: article.id});
    if (!oldArticle.length) {
      feedsRepo.add(article)
    }
  })
  res.end();
}

exports.getData = getData;