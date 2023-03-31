const express = require('express');
const axios = require('axios');
const crypto = require('crypto');

const clientSecret = "c20425e6af3bc5894273450459e375d24425d502"
const clientId = "996c39ae0294bf63c420"
const redirectUri = "http://localhost:3000/redirect"
const scope = "user repo"

const app = express();
const authUsers = {}

const getUserData = async (accessToken) => {
  try {
    const response = await axios({
      method: 'get',
      url: 'https://api.github.com/user',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response;
  } catch (error) {
    throw new Error('Error getting user data');
  }
}

const getToken = async (code) => { 
  const token = await axios({
    method: 'post',
    url : 'https://github.com/login/oauth/access_token',
    headers: {
      Accept: 'application/json'
    },
    params : {
      client_id: clientId,
      client_secret: clientSecret,
      code,
    }
  })
  return token
}

const getUserFollowers = async (accessToken) => {
  try {
    const response = await axios({
      method: 'get',
      url: 'https://api.github.com/user/followers',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response;
  } catch (error) {
    throw new Error('Error getting user followers');
  }
}

const getUserRepos = async (accessToken) => {
  try {
    const response = await axios({
      method: 'get',
      url: 'https://api.github.com/user/repos',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response;
  } catch (error) {
    throw new Error('Error getting user repos');
  }
}

app.get('/', (req, res) => {
  res.json({loginUrl: `https://github.com/login/oauth/authorize/?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`})
})

app.get('/redirect', async (req, res) => {
  const { code } = req.query;
  const token = await getToken(code )
  const access_token = token.data.access_token;
  const sessionId  = crypto.randomBytes(16).toString('base64')
  authUsers[sessionId] = access_token;
  res.setHeader('Set-Cookie', `sessionId=${sessionId}`)
  return res.json('Success')
});

app.get('/profile' , async (req, res) => {
  const cookie = req.headers.cookie;
  const sessionId = cookie.replace('sessionId=' , '');
  const access_token = authUsers[sessionId];
  const {data} = await getUserData(access_token)
  return res.json(data);
})

app.get('/followers', async (req, res) => {
  const cookie = req.headers.cookie;
  const sessionId = cookie.replace('sessionId=' , '');
  const access_token = authUsers[sessionId];
  const {data} = await getUserFollowers(access_token)
  return res.json(data);
})

app.get('/repos', async (req, res) => {
  const cookie = req.headers.cookie;
  const sessionId = cookie.replace('sessionId=' , '');
  const access_token = authUsers[sessionId];
  const {data} = await getUserRepos(access_token)
  return res.json(data);
})

app.use((error , req , res , next) => {
  res.json(error.response.message);
})
app.listen(3006 , ()=> {
  console.log(`server listening on http://localhost:3000`);
})