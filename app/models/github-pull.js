import { attr } from '@ember-data/model';
import GithubPullModel from 'ember-data-github/models/github-pull';
import moment from 'moment';

// Find the most recent Saturday, the day after we publish a Times issue
const currentDay = moment().day();
const index = (currentDay < 6) ? -1 : 6;
const beginningOfSaturday = moment().day(index).startOf('day');

export default class GithubPull extends GithubPullModel {
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
  @attr('string') repositoryUrl;

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
    return (this.repositoryUrl ?? '').replace('https://api.github.com/repos/', '');
  }
}
