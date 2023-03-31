const axios = require('axios');

const getToken = async (code,data) => { 
  const token = await axios({
    method: 'post',
    url : 'https://github.com/login/oauth/access_token',
    headers: {
      Accept: 'application/json'
    },
    params : {
      client_id: data.clientId,
      client_secret: data.clientSecret,
      code,
    }
  })
  return token
}

const isAuthroized = (req,authUsers) =>{
  const cookie = req.headers.cookie;
  const sessionId = cookie.replace('sessionId=' , '');
  const access_token = authUsers[sessionId];
  return access_token;
}
module.exports = {getToken , isAuthroized}