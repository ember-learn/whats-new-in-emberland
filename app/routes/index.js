import Route from '@ember/routing/route';
import { computed, get } from '@ember/object';
import { isPresent } from '@ember/utils';
import CONSTANTS from 'whats-new-in-emberland/constants';
import { all, hash } from 'rsvp';
import moment from 'moment';
import { inject as service } from '@ember/service';

export default Route.extend({
  githubSession: service(),

  dateKey: null, // set this to another date to load PRs from a previous week, e.g. dateKey: "2018-11-01"
  currentDate: computed(function() {
    let dateValue = this.get('dateKey');
    return isPresent(dateValue) ? moment(dateValue) : moment();
  }),
  startOfWeek: computed(function() {
    let currentDate = this.get('currentDate');
    let dayIndex = currentDate.day() < 6 ? -1 : 6;
    return this.get('currentDate').day(dayIndex);
  }),
  async model() {
    const store = this.get('store');
    const startOfWeek = this.get('startOfWeek');

    const projectFetches = CONSTANTS.REPOS.map((repo) => {
      return store.findRecord('github-organization', repo);
    });

    let orgs = await all(projectFetches);

    const repoFetches = orgs.map((org) => {
      return fetch(`https://api.github.com/search/repositories\?q\=user:${org.id}+archived:false`, {
        headers: {
          'Authorization': `token ${get(this, 'githubSession.githubAccessToken')}`,
        },
      })
      .then((response) => response.json())
      .then((repos) => this.store.pushPayload('github-repository', { githubRepository: repos.items }));
    });

    await all(repoFetches);
    let repos = store.peekAll('github-repository');

    const prFetches = repos.map((repo) => {
      let repoName = repo.get('fullName');
      return store.query('github-pull', { repo: repoName, state: 'all' });
    });

    const rfcFetches = ['ember-cli/rfcs', 'emberjs/rfcs'].map((repo) => {
      return store.query('github-pull', { repo, state: 'all' });
    });

    let pullSets = await all(prFetches);
    let rfcSets = await all(rfcFetches);

    let mergedPulls = pullSets.map((pulls) => {
      return pulls.filter((pull) => {
        return moment(pull.get('mergedAt')) > moment(startOfWeek);
      });
    }).reduce((previousValue, item) => previousValue.concat(item), []);

    let newPulls = pullSets.map((pulls) => {
      return pulls.filter((pull) => {
        return moment(pull.get('createdAt')) > moment(startOfWeek) && !pull.get('mergedAt');
      });
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
      repos,
      mergedPulls,
      newPulls,
      mergedRfcs,
      newRfcs
    });
  },
});
