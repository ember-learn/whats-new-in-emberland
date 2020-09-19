import Route from '@ember/routing/route';
import dayjs from 'dayjs';
import { all } from 'rsvp';
import { filterMerged, filterUpdated, sortPullRequests } from 'whats-new-in-emberland/utils/pull-request';

export default class PullRequestsRoute extends Route {
  queryParams = {
    mergedSince: {
      refreshModel: true
    },
  };

  mergedSince = null;

  model(params) {
    this.mergedSince = params.mergedSince;

    if (!this.mergedSince) {
      return [];
    }

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

    controller.mergedPRs = sortPullRequests(filterMerged({
      pullRequests: model,
      mergedSince: this.mergedSince,
    }));

    controller.updatedPRs = sortPullRequests(filterUpdated({
      pullRequests: model,
      mergedSince: this.mergedSince,
    }));
  }

  async fetchPRs(organizations) {
    const createdSince = dayjs(this.mergedSince).subtract(2, 'weeks').format('YYYY-MM-DD');

    const fetchRequests = organizations.map(organization => {
      return this.store.query('pull-request', {
        organization,
        createdSince,
      });
    });

    await all(fetchRequests);

    return this.store.peekAll('pull-request');
  }
}
