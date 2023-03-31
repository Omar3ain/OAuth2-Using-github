const axios = require('axios');

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

module.exports = {getUserData ,getUserFollowers, getUserRepos }