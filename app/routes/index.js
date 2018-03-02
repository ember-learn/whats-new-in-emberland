import Route from '@ember/routing/route';
import CONSTANTS from 'whats-new-in-emberland/constants';
import { all, hash } from 'rsvp';

export default Route.extend({
  model() {
    const store = this.get('store');
    const repoFetches = CONSTANTS.REPOS.map((repo) => {
      return store.findRecord('github-organization', repo);
    });
    return all(repoFetches).then((orgs) => orgs);
  },

  async setupController(controller, model) {
    this._super(controller, model);
    // Implement your custom setup after
    /* const reposPromise = model.getEach('githubRepositories');
    const pulls = all(reposPromise)
      .then((repos) => {
        all(repos.map((repo) => repo.get('name'))).then((names) => { console.log(names); });
        // all(repos.map((rep) => rep.get('name'))).then((names) => { console.log(names); });
        return all(repos.getEach('pulls'))
        .then((pulls) => {
          console.log(pulls);
          this.controllerFor('index').set('pulls', pulls);
          return all(pulls);
        });
      }) */

  }
});
