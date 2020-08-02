import { computed } from '@ember/object';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { isPresent } from '@ember/utils';
import { tracked } from '@glimmer/tracking';
import moment from 'moment';
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
  @service
  githubSession;

  @tracked dateKey = null; // set this to another date to load PRs from a previous week, e.g. dateKey: "2018-11-01"

  @computed('dateKey')
  get currentDate() {
    let dateValue = this.dateKey;
    return isPresent(dateValue) ? moment(dateValue) : moment();
  }

  @computed('currentDate')
  get startOfWeek() {
    let currentDate = this.currentDate;
    let dayIndex = currentDate.day() < 6 ? -1 : 6;
    return this.currentDate.day(dayIndex);
  }

  model() {
    return hash({
      pulls: this.fetchPRs(),
      rfcs: this.fetchRFCs()
    });
  }

  setupController(controller, model) {
    super.setupController(controller, model);

    const { pulls, rfcs } = model;

    controller.mergedPulls = pulls.filter(pull => {
      const { isMadeByUser, isMergedThisWeek } = pull;

      return isMadeByUser && isMergedThisWeek;
    });

    controller.newPulls = pulls.filter(pull => {
      const { isMadeByUser, isMergedThisWeek, isNewThisWeek } = pull;

      return isMadeByUser && isNewThisWeek && !isMergedThisWeek;
    });

    controller.mergedRfcs = rfcs.filter(pull => {
      const { isMadeByUser, isMergedThisWeek } = pull;

      return isMadeByUser && isMergedThisWeek;
    });

    controller.newRfcs = rfcs.filter(pull => {
      const { isMadeByUser, isMergedThisWeek, isNewThisWeek } = pull;

      return isMadeByUser && isNewThisWeek && !isMergedThisWeek;
    });
  }


  async fetchPRs() {
    const fetchRequests = ORGANIZATIONS.map(organization => {
      return this.fetchPRsAtOrganization(organization);
    });

    await all(fetchRequests);

    return this.store.peekAll('github-pull').toArray();
  }

  async fetchPRsAtOrganization(organization) {
    const url = this.buildUrlForSearchingPRs(organization);

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

  buildUrlForSearchingPRs(organization) {
    const createdSince = moment(this.startOfWeek).format('YYYY-MM-DD');

    return `https://api.github.com/search/issues?q=is:pr+org:${organization}+created:>=${createdSince}`;
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
