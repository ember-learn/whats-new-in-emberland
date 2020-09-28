[![This project uses GitHub Actions for continuous integration.](https://github.com/ember-learn/whats-new-in-emberland/workflows/CI/badge.svg)](https://github.com/ember-learn/whats-new-in-emberland/actions?query=workflow%3ACI)

# What's New in Emberland

This is an overview app of Ember-related Github activity used by the investigative folks over at [The Ember Times](https://twitter.com/embertimes) to find new, relevant topics for the newsletter.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

This project uses `yarn` to manage npm packages. To check whether you have installed `yarn` already, run the following command in a terminal:

```bash
# Try running:
yarn --version

# Output may look something like:
1.22.5
```

If you get an error message instead, please try [installing yarn](https://classic.yarnpkg.com/en/docs/install) to see if it fixes the error.

### Setup

After forking this repo on GitHub, please try the following steps:

- `git clone <your-forked-repository-url>`
- `cd whats-new-in-emberland`
- `yarn install`
- You will need to [create a GitHub personal access token](https://github.com/settings/tokens). Each token that you create already comes with a suitable set of permissions to read public repos. This set of permissions is enough to run `whats-new-in-emberland`. There's no need for you to select additional permissions in the token generation wizard.
- Pass your token when running the Ember app locally:

    ```bash
    GITHUB_API_KEY=<my-secret-token> ember serve
    ```

## Running / Development

* `GITHUB_API_KEY=<my-secret-token> ember serve`
* Visit your app at [http://localhost:4200/](http://localhost:4200/).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `yarn test`
* `ember test --server`

### Linting

* `yarn lint`
* `yarn lint:js -- --fix`

### Building

* `yarn build` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
