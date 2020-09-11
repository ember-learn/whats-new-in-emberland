import Route from '@ember/routing/route';
import { all } from 'rsvp';
import { filterMerged, filterNew } from 'whats-new-in-emberland/utils/pull-request';

export default class PullRequestsRoute extends Route {
  model() {
    return this.fetchPRs([
      'adopted-ember-addons',
      'ember-cli',
      'ember-codemods',
      'ember-fastboot',
      'ember-learn',
      'emberjs',
      'glimmerjs',
    ]);
  }

  setupController(controller, model) {
    super.setupController(controller, model);

    controller.mergedPRs = filterMerged(model);
    controller.newPRs = filterNew(model);
  }

  async fetchPRs(organizations) {
    const fetchRequests = organizations.map(organization => {
      return this.store.query('pull-request', { organization });
    });

    await all(fetchRequests);

    return this.store.peekAll('pull-request');
  }
}
