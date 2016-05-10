const qs = require('querystring');
const request = require('request');

WrikeAPI = function(accessToken, account) {
  this.account = account;
  this.token = accessToken;
};

WrikeAPI.prototype.get = function(endpoint, options) {
  return new Promise((resolve, reject) => {
    request.get({
      url: `https://www.wrike.com/api/v3/${endpoint}?${qs.stringify(options)}`,
      headers: { authorization: `bearer ${this.token}` }
    }, function(err, res) {
      if (err || !res || !JSON.parse(res.body)) return reject(err);
      var response = JSON.parse(res.body);
      if (response.errorDescription) return reject(new Error(response.errorDescription));
      resolve(response.data);
    });
  });
};

module.exports = WrikeAPI;
