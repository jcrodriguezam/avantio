/* eslint-disable no-undef */

const mongoose = require('mongoose')
const axios = require('axios')
const Feed = require('../models/feeds.model');

// const app = require('../../app');
// const supertest = require('supertest');


const app = require('../../app');
const supertest = require('supertest');

const request = supertest(app);


const config = require('../../config/config');
const { url, database } = config.mongo;
const { port, endpoint } = config;

const BASE_URL = `${endpoint}:${port}`

async function init() {
  mongoose.Promise = global.Promise
  mongoose.connect(`${url}/${database}`)
  const db = mongoose.connection
  
  db.on('error', function(err){
    console.log('connection error', err)
  })
  
  db.once('open', function(){
    console.log('Connection to DB successful')
  })
  
  return db;
}

const FEEDS = [
  {
    id: '00001',
    title: 'titulo prueba 1',
    image: 'imagen de prueba 1',
    source: 'source de prueba 1',
    publisher: 'elPais',
    dateAsString: '22122018',
    edited: false
  },
  {
    id: '00002',
    title: 'titulo prueba 2',
    image: 'imagen de prueba 2',
    source: 'source de prueba 2',
    publisher: 'elPais',
    dateAsString: '17072021',
    edited: false
  },
  {
    id: '00003',
    title: 'titulo prueba 3',
    image: 'imagen de prueba 3',
    source: 'source de prueba 3',
    publisher: 'elMundo',
    dateAsString: '16041983',
    edited: true
  },
  {
    id: '00004',
    title: 'titulo prueba 4',
    image: 'imagen de prueba 4',
    source: 'source de prueba 4',
    publisher: 'elMundo',
    dateAsString: '19101986',
    edited: false
  }
]

async function initTest() {
  await feedsCollection.drop();
  const feed0 = new Feed({...FEEDS[0]});
  const feed1 = new Feed({...FEEDS[1]});
  const feed2 = new Feed({...FEEDS[2]});

  feed0.save();
  feed1.save();
  feed2.save();
}


describe('Feeds', () => {
  beforeAll(async () => {
    const db = await init();
    feedsCollection = db.collection('feeds');
    await initTest();

  });
  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('This shuld get feeds', async () => {
    const res = await request.get(`/`);
    expect(res.status).toBe(200);
  });

  test('This shuld get feeds for 22122018', async () => {
    const res = await request.get(`/date/22122018`);
    expect(res.status).toBe(200);
  });

  test('This shuld not get feeds for 19101986', async () => {
    const res = await request.get(`/date/19101986`);
    expect(res.status).toBe(200);
  });

  test('This shuld add feeds', async () => {
    const res = await axios.post(`${BASE_URL}/`,{ ...FEEDS[3]});
    expect(res.status).toBe(200);
  });

});