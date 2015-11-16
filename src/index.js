var Path = require('path')
var Request = require('request')
var URL = require('url')
var Util = require('util')

/**
 * A simple interface to the Slack web API
 * @class
 * @param {string} token
 */
var SlackAttack = module.exports =  function(token){
  /** @member {string} */
  this.token = token
  this.__uri = {
    protocol: 'https',
    hostname: 'slack.com',
    pathname: '/api'
  }
}

/**
 * Interface to the `chat` API method.
 * @param {string} channel
 * @param {string} message
 * @param {object} options
 * @param {function} callback
 */
SlackAttack.prototype.chat = function(channel, message, options, callback){
  var payload = {
    channel: channel,
    text: message,
  }

  for (var attrname in options) {
    if (options.attachments instanceof Array) {
      payload.attachments = JSON.stringify(options.attachments)
    } else {
      payload[attrname] = options[attrname];
    }
  }

  this.api("chat.postMessage", payload, callback);
}

/**
 * Creates URI for the specific API method
 * @param {string} method
 * @param {object} query
 * @return {string}
 */
SlackAttack.prototype.uri = function(method, query){
  var u = Util._extend({}, this.__uri);
  u.pathname = Path.join(u.pathname, method)
  u.query = query || {}
  u.query.token = this.token

  return URL.format(u)
}

/**
 * Makes the request to Slack
 * @param {string} method
 * @param {object} request
 * @param {function} callback
 */
SlackAttack.prototype.api = function(method, request, callback){
  Request.get({
    url: this.uri(method, request)
  }, function(err, res, body){
    if (callback instanceof Function){
      var resp = JSON.parse(body)
      callback(err, (resp.ok === true), resp)
    }
  })
}

