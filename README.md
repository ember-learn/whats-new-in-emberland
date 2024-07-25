[![This project uses GitHub Actions for continuous integration.](https://github.com/ember-learn/whats-new-in-emberland/workflows/CI/badge.svg)](https://github.com/ember-learn/whats-new-in-emberland/actions?query=workflow%3ACI)

# What's New in Emberland

This is an overview app of Ember-related Github activity used by the investigative folks over at [The Ember Times](https://twitter.com/embertimes) to find new, relevant topics for the newsletter.

## Prerequisites

You will need the following things properly installed on your computer.

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- [PNPM](https://pnpm.io)
- [Ember CLI](https://cli.emberjs.com/release/)
- [Google Chrome](https://google.com/chrome/)

### Setup

After forking this repo on GitHub, please try the following steps:

- `git clone <your-forked-repository-url>`
- `cd whats-new-in-emberland`
- `pnpm i`
- You will need to [create a GitHub personal access token](https://github.com/settings/tokens). Each token that you create already comes with a suitable set of permissions to read public repos. This set of permissions is enough to run `whats-new-in-emberland`. There's no need for you to select additional permissions in the token generation wizard.
- Create an `.env` file using the `.env-sample` included in the repo, then add your Github personal access token to the file.

## Running / Development

- `pnpm start`
- Visit your app at [http://localhost:4200](http://localhost:4200).
- Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

- `pnpm test`
- `pnpm test:ember --server`

### Linting

- `pnpm lint`
- `pnpm lint:fix`

### Building

- `pnpm ember build` (development)
- `pnpm build` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

- [ember.js](https://emberjs.com/)
- [ember-cli](https://cli.emberjs.com/release/)
- Development Browser Extensions
  - [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  - [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
