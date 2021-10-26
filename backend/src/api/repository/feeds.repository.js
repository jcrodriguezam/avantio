const Feed = require('../models/feeds.model');

async function find(query) {
  return Feed.find(query)
}

exports.find = find;

async function add(body) {
  const feed = new Feed({...body});
  feed.save(function (err) {
    if (err) {
      console.log(err);
    }
  });
  
  return feed
}

exports.add = add;

async function update(filter, body) {
  const update = {...body, edited: true}
  const newFeed = await Feed.findOneAndUpdate(filter, update, {rawResult: true});
  return newFeed;
}

exports.update = update;

async function deleteFeed(dateAsString, publisher) {
  const deleteFeed = await Feed.findOneAndDelete({dateAsString, publisher})
  return deleteFeed;
}

exports.deleteFeed = deleteFeed;