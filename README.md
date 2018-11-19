# whats-new-in-emberland

This is an overview app of Ember-related Github activity used by the investigative folks over at [The Ember Times](https://twitter.com/embertimes) to find new, relevant topics for the newsletter.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* `cd whats-new-in-emberland`
* `yarn`
* if you do not have one yet, please create a valid Github API Token [here](https://github.com/settings/tokens) and set it in your `~/.bashrc` file as follows:
```bash
export GITHUB_API_KEY="my-key-id"
```
* run `source ~/.bashrc` to give your current terminal window access to the updated env variables

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200/overview/](http://localhost:4200/overview/).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
