# :boom: Slack-Attack :metal:
Use this to as an interface to the Slack web API.

## Usage
`npm install slack-attack`

```javascript
    var SlackAttack = require('slack-attack');
    var slack = new SlackAttack('<YOUR-API-KEY>');

    slack.chat('#<channel>', '<message>', {options}, function(err, posted, resp){
      console.log(err, posted, resp);
    });
```

* `channel`: the channel you want to post to
* `message`: a string to post to the channel (can be an empty string)
* `options`: an object with optional attachments for Slack. This follows the same convention as [Slack's documentation](https://api.slack.com/docs/attachments)
* `callback`: the function signature should be of the form of `(err, posted, response)` where `err` is the standard error of the request, `posted` is a boolean response from Slack if your message was successfully posted, and `response` is the body of the response from the Slack API.
