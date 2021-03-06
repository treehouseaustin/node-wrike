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

// @see https://developers.wrike.com/documentation/api/methods/get-comments
WrikeAPI.prototype.getComments = function(id, scope, options) {
  var endpoint = 'comments';
  if (scope && id) {
    endpoint = `${scope}/${id}/comments`;
  }
  return this.get(endpoint, options);
};

// @see https://developers.wrike.com/documentation/api/methods/query-dependencies
WrikeAPI.prototype.getDependencies = function(taskOrDependencies, options) {
  var endpoint = Array.isArray(taskOrDependencies) ? `dependencies/${taskOrDependencies.join(',')}` : `tasks/${taskOrDependencies}/dependencies`;
  return this.get(endpoint, options);
};

// @see https://developers.wrike.com/documentation/api/methods/get-folder
WrikeAPI.prototype.getFolder = function(folderIds, options) {
  var endpoint = `folders/${Array.isArray(folderIds) ? folderIds.join(',') : folderIds}`;
  return this.get(endpoint, options);
};

// @see https://developers.wrike.com/documentation/api/methods/get-folder-tree
WrikeAPI.prototype.getFolders = function(folderId, options) {
  var endpoint = this.account ? `accounts/${this.account}/folders` : 'folders';
  if (folderId) endpoint = `folders/${folderId}/folders`;
  return this.get(endpoint, options);
};

// @see https://developers.wrike.com/documentation/api/methods/query-tasks
WrikeAPI.prototype.getTask = function(taskIds, options) {
  if (Array.isArray(taskIds)) taskIds = taskIds.join(',');
  return this.get(`tasks/${taskIds}`, options);
};

// @see https://developers.wrike.com/documentation/api/methods/query-tasks
WrikeAPI.prototype.getTasks = function(folderId, options) {
  var endpoint = this.account ? `accounts/${this.account}/tasks` : 'tasks';
  if (folderId) endpoint = `folders/${folderId}/tasks`;
  return this.get(endpoint, options);
};

// @see https://developers.wrike.com/documentation/api/methods/query-user
WrikeAPI.prototype.getUser = function(userId) {
  return this.get(`users/${userId}`);
};

module.exports = WrikeAPI;
