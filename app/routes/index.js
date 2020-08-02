import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { buildUrlForSearchingPRs, filterMerged, filterNew } from 'whats-new-in-emberland/utils/pull-request';
import { all, hash } from 'rsvp';

// Check pull requests made to repos at these organizations
const ORGANIZATIONS = [
  'adopted-ember-addons',
  'ember-cli',
  'ember-codemods',
  'ember-fastboot',
  'ember-learn',
  'emberjs',
  'glimmerjs',
];

const REPOS_FOR_RFCS = [
  'ember-cli/rfcs',
  'emberjs/rfcs',
];

export default class IndexRoute extends Route {
  @service githubSession;

  model() {
    return hash({
      prs: this.fetchPRs(),
      rfcs: this.fetchRFCs()
    });
  }

  setupController(controller, model) {
    super.setupController(controller, model);

    const { prs, rfcs } = model;

    controller.mergedPRs = filterMerged(prs);
    controller.newPRs = filterNew(prs);
    controller.mergedRFCs = filterMerged(rfcs);
    controller.newRFCs = filterNew(rfcs);
  }


  async fetchPRs() {
    const fetchRequests = ORGANIZATIONS.map(organization => {
      return this.fetchPRsAtOrganization(organization);
    });

    await all(fetchRequests);

    return this.store.peekAll('github-pull').toArray();
  }

  async fetchPRsAtOrganization(organization) {
    const url = buildUrlForSearchingPRs(organization);

    const response = await fetch(url, {
      headers: {
        'Authorization': `token ${this.githubSession.githubAccessToken}`
      }
    });

    const { items } = await response.json();

    this.store.pushPayload('github-pull', {
      githubPull: items
    });
  }


  async fetchRFCs() {
    const fetchRequests = REPOS_FOR_RFCS.map(repo => {
      return this.store.query('github-pull', {
        repo,
        state: 'all'
      });
    });

    const pullRequestsByRepo = await all(fetchRequests);

    // Return an array of `github-pull` model class instances
    return pullRequestsByRepo.reduce((accumulator, pullRequests) => {
      accumulator.push(...pullRequests.toArray());

      return accumulator;

    }, []);
  }
}
