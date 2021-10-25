const { db } = require('../../config/database');

function getFeed(req, res) {
  const { params } = req;
  const { dateAsString } = params;
  console.log('body', params)
  res.send({ test: `Esto es el getFeed, ${dateAsString}`})
}

exports.getFeed = getFeed;

async function postFeed(req, res) {
  await db().collection('feeds').insertOne({prueba: 'text p1', prueba2: 'texto p2' });
  res.send('Esto es el postFeed')
}

exports.postFeed = postFeed;

async function patchFeed(req, res) {
  res.send('Esto es el patchFeed')
}

exports.patchFeed = patchFeed;

async function deleteFeed(req, res) {
  res.send('Esto es el deleteFeed')
}

exports.deleteFeed = deleteFeed;