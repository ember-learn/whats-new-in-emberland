import Route from '@ember/routing/route';
import CONSTANTS from 'whats-new-in-emberland/constants';
import { all } from 'rsvp';

export default Route.extend({
  model() {
    const store = this.get('store');
    const repoFetches = CONSTANTS.REPOS.map((repo) => {
      return store.findRecord('github-organization', repo);
    });
    return all(repoFetches);
  },
});
