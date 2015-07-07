# Pretty-Slack
Use this to post pretty messages to Slack using their API.

## Usage
`npm install pretty-slack`

```javascript
    var PrettySlack = require('pretty-slack');
    var slack = new PrettySlack('<YOUR-API-KEY>');

    slack.chat('#<channel>', '<unformatted message or empty string>', 'avatar or empty string', options, callback);
```

`options`: an object with options for formatted messages. Slack expects these to be in the form of `attachments: []`
`callback`: will take two parameters `(err, posted)` `err` is your standard error, `posted` is whether or not it was successfully posted.
