const Feed = require('../models/feeds.model');
const feedsRepo = require('../repository/feeds.repository');
const webScrap = require('../services/webScrap');


async function getNewData() {
  const ws = await webScrap.getData();

  for (const newArticle of ws) {
    const oldArticle = await feedsRepo.find({id: newArticle.id});
    if (!oldArticle.length) {
      await feedsRepo.add(newArticle)
    }
  }

  return;
}

function getTodayAsString() {
  const d = new Date();
  const year = d.getFullYear();
  const month = `0${d.getMonth() + 1}`.slice(-2);
  const day = `0${d.getDate()}`.slice(-2);

  return `${year}${month}${day}`
}

async function getFeed(req, res) {
  const { params } = req;
  let query = {deleted: false}
  const today = getTodayAsString();
  
  if (params) {
    const { dateAsString } = params;
    if (dateAsString) {
      query.dateAsString= dateAsString
    }
  }

  if (!query.dateAsString || query.dateAsString === today) {
    const todayFeeds = await feedsRepo.find({dateAsString: today});
    if(!todayFeeds.length) {
      await getNewData();
    }
  }

  const result = await feedsRepo.find(query);
  result.sort((a, b) => a.dateAsString < b.dateAsString && 1 || -1)
  res.send(result);
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
  await getNewData();
  res.end();
}

exports.getData = getData;