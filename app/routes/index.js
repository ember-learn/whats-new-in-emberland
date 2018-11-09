import Route from '@ember/routing/route';
import CONSTANTS from 'whats-new-in-emberland/constants';
import { all, hash } from 'rsvp';

export default Route.extend({
  startOfWeek: "2018-11-02",
  async model() {
    const store = this.get('store');
    const startOfWeek = this.get('startOfWeek');
    const projectFetches = CONSTANTS.REPOS.map((repo) => {
      return store.findRecord('github-organization', repo);
    });
    let orgs = await all(projectFetches).then((orgs) => orgs);
    const repoFetches = orgs.map((org) => {
      return org.get('githubRepositories');
    });
    let repos = await all(repoFetches).then((repos) => repos);
    let allRepos = store.peekAll('githubRepository');
    console.log({ allRepos });
    const prFetches = allRepos.map((repo) => {
      let repoName = repo.get('fullName');
      console.log({ repoName });
      return store.query('github-pull', { repo: repoName, state: 'all' });
    });
    let pulls = await all(prFetches).then((pulls) => pulls);
    let mergedPulls = pulls.filter((pull) => {
      return moment(pull.get('mergedAt')) > moment(startOfWeek);
    });
    let newPulls = pulls.filter((pull) => {
      return moment(pull.get('createdAt')) > moment(startOfWeek);
    });
    console.log({ pulls });
    return hash({
      orgs,
      repos,
      pulls,
      mergedPulls,
      newPulls,
    })
  },
});
