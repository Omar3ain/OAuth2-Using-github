const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const tokenCreation = require('./utils/getToken');
const getUser = require('./controllers/user');

require('dotenv/config');

const { CLIENT_SECRET: clientSecret, CLIENT_ID: clientId, REDIRECT_URI: redirectUri, SCOPE: scope , PORT: port} = process.env;

const app = express();
const authUsers = {}

app.get('/', (req, res) => {
  res.json({loginUrl: `https://github.com/login/oauth/authorize/?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`})
})

app.get('/redirect', async (req, res) => {
  const { code } = req.query;
  const token = await tokenCreation.getToken(code , {clientId,clientSecret})
  const access_token = token.data.access_token;
  const sessionId  = crypto.randomBytes(16).toString('base64')
  authUsers[sessionId] = access_token;
  res.setHeader('Set-Cookie', `sessionId=${sessionId}`)
  return res.json('Success')
});

app.get('/profile' , async (req, res) => {
  access_token = tokenCreation.isAuthroized(req,authUsers);
  const {data} = await getUser.getUserData(access_token)
  return res.json(data);
})

app.get('/followers', async (req, res) => {
  access_token = tokenCreation.isAuthroized(req,authUsers);
  const {data} = await getUser.getUserFollowers(access_token)
  return res.json(data);
})

app.get('/repos', async (req, res) => {
  access_token = tokenCreation.isAuthroized(req,authUsers);
  const {data} = await getUser.getUserRepos(access_token)
  return res.json(data);
})

app.use((error , req , res , next) => {
  res.json(error.response.message);
})

app.listen(port , ()=> {
  console.log(`server listening on http://localhost:${port}`);
})