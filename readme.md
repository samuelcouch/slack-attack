# Pretty-Slack
Use this to post pretty messages to Slack using their API.

## Usage
`npm install pretty-slack`

```javascript
    var PrettySlack = require('pretty-slack');
    var slack = new PrettySlack('<YOUR-API-KEY>');

    slack.chat('#<channel>', '<message>', {attachments}, callback);
```

`channel`: the channel you want to post to
`message`: a string to post to the channel (can be an empty string)
`options`: an object with optional attachments for slack. This follows the same convention as [Slack's documentation](https://api.slack.com/docs/attachments)
`callback`: the function signature should be of the form of `(err, posted)` where `err` is the standard error of the request, and `posted` is a boolean response from Slack if your message was successfully posted.
