import GithubPullAdapter from 'ember-data-github/adapters/github-pull';

export default class GithubPull extends GithubPullAdapter {
  urlForQueryRecord(query) {
    const {repo, pullNumber} = query;
    delete query.repo;
    delete query.pullNumber;

    return `${this.host}/repos/${repo}/pulls/${pullNumber}`;
  }
}
