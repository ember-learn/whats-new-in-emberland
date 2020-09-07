import Model, { attr } from '@ember-data/model';
import { beginningOfSaturday } from 'whats-new-in-emberland/utils/pull-request';

const GITHUB_URL = 'https://github.com';

export default class PullRequestModel extends Model {
  // PR title
  @attr('string') title;

  // PR description
  @attr('string') body;

  // PR state
  @attr('string') state;
  @attr('boolean') draft;
  @attr('boolean') locked;

  // Links
  @attr('string') htmlUrl;

  // Timestamps
  @attr('date') createdAt;
  @attr('date') updatedAt;
  @attr('date') closedAt;

  // Relationships
  @attr user;

  // Getters
  get isMadeByUser() {
    return this.user.type === 'User';
  }

  get isMergedThisWeek() {
    return this.closedAt >= beginningOfSaturday;
  }
 
  get isNewThisWeek() {
    return this.updatedAt >= beginningOfSaturday;
  }

  get repositoryName() {
    const routeNames = (this.htmlUrl ?? '').replace(`${GITHUB_URL}/`, '').split('/');

    if (routeNames.length < 2) {
      return '';
    }

    const [ organizationName, repositoryName ] = routeNames;

    return `${organizationName}/${repositoryName}`;
  }

  get repositoryUrl() {
    return `${GITHUB_URL}/${this.repositoryName}`;
  }
}
