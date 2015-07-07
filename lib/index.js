import Path from 'path'
import Request from 'request'
import URL from 'url'
import Util from 'util'

export class PrettySlack {
    constructor(token){
        this.token = token
        this.__uri = {
            protocol: 'https',
            hostname: 'slack.com',
            pathname: '/api'
        }
    }

    /*
     * @channel: required
     * @message: required (can be empty string)
     * @options: (optional) -- see Slack API documentation
     * @callback: (optional) -- takes (err, posted)
     *  -- `err` is standard error
     *  -- `posted` is boolean response from Slack
     */
    chat(channel, message, options, callback){
      let payload = {
        channel: channel,
        text: message,
        icon_emoji: options.icon_emoji,
      };

      if (options.attachments instanceof Array)
        payload.attachments = JSON.stringify(options.attachments);

      this.api("chat.postMessage", payload, callback);
    }

    uri(method, query){
        let u = Util._extend({}, this.__uri);
        u.pathname = Path.join(u.pathname, method)
        u.query = query || {}
        u.query.token = this.token

        return URL.format(u)
    }

    api(method, request, callback){
        Request.get({
            url: this.uri(method, request)
        }, function(err, res, body){
            if (callback instanceof Function)
                callback(err, (JSON.parse(body).ok === true))
        });
    }
}

