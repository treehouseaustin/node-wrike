# node-wrike

Intended to be a lightweight Node wrapper for the [Wrike API](https://developers.wrike.com/documentation). You must provide at minimum an `accessToken` and optionally an `account` which will be used when querying the API. The access token must be retrieved using OAuth2 as documented [here](https://developers.wrike.com/documentation/oauth2) and is out of the scope of this module.

Currently implemented:

* `get`: generic API wrapper
* `getDependencies`: [Query Dependencies](https://developers.wrike.com/documentation/api/methods/query-dependencies) wrapper
* `getFolders`: [Get Folder Tree](https://developers.wrike.com/documentation/api/methods/get-folder-tree) wrapper
* `getTask`: [Query Tasks](https://developers.wrike.com/documentation/api/methods/query-tasks) wrapper for single Tasks
* `getTasks`: [Query Tasks](https://developers.wrike.com/documentation/api/methods/query-tasks) wrapper for multiple Tasks
