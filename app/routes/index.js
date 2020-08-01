import Route from '@ember/routing/route';
import { computed } from '@ember/object';
import { isPresent } from '@ember/utils';
import CONSTANTS from 'whats-new-in-emberland/constants';
import { all, hash } from 'rsvp';
import moment from 'moment';
import { inject as service } from '@ember/service';

export default Route.extend({
  githubSession: service(),

  dateKey: null, // set this to another date to load PRs from a previous week, e.g. dateKey: "2018-11-01"
  currentDate: computed('dateKey', function() {
    let dateValue = this.dateKey;
    return isPresent(dateValue) ? moment(dateValue) : moment();
  }),
  startOfWeek: computed('currentDate', function() {
    let currentDate = this.currentDate;
    let dayIndex = currentDate.day() < 6 ? -1 : 6;
    return this.currentDate.day(dayIndex);
  }),
  async model() {
    const store = this.store;
    const startOfWeek = this.startOfWeek;

    const projectFetches = CONSTANTS.REPOS.map((repo) => {
      return store.findRecord('github-organization', repo);
    });

    let orgs = await all(projectFetches);

    const prFetches = orgs.map((org) => {
      return fetch(`https://api.github.com/search/issues?q=is:pr+org:${org.id}+created:>=${moment(startOfWeek).format('YYYY-MM-DD')}`, {
        headers: {
          'Authorization': `token ${this.githubSession.githubAccessToken}`,
        },
      })
      .then((response) => response.json())
      .then((pulls) => this.store.pushPayload('github-pull', { githubPull: pulls.items }));
    });

    const rfcFetches = ['ember-cli/rfcs', 'emberjs/rfcs'].map((repo) => {
      return store.query('github-pull', { repo, state: 'all' });
    });

    await all(prFetches);
    let pulls = this.store.peekAll('github-pull').toArray();
    let rfcSets = await all(rfcFetches);

    let mergedPulls = pulls.filter((pull) => {
      return moment(pull.get('mergedAt')) > moment(startOfWeek);
    }).reduce((previousValue, item) => previousValue.concat(item), []);

    let newPulls = pulls.filter((pull) => {
      return moment(pull.get('createdAt')) > moment(startOfWeek) && !pull.get('mergedAt');
    }).reduce((previousValue, item) => previousValue.concat(item), []);

    let newRfcs = rfcSets.map((pulls) => {
      return pulls.filter((pull) => {
        return moment(pull.get('createdAt')) > moment(startOfWeek);
      });
    }).reduce((previousValue, item) => previousValue.concat(item), []);

    let mergedRfcs = rfcSets.map((pulls) => {
      return pulls.filter((pull) => {
        return moment(pull.get('mergedAt')) > moment(startOfWeek);
      });
    }).reduce((previousValue, item) => previousValue.concat(item), []);

    return hash({
      orgs,
      mergedPulls,
      newPulls,
      mergedRfcs,
      newRfcs
    });
  },
});
