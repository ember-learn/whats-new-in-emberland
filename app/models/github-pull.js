import { computed } from '@ember/object';
import { attr } from '@ember-data/model';
import GithubPullModel from 'ember-data-github/models/github-pull';
import moment from 'moment';

export default class GithubPull extends GithubPullModel {
  @attr('string')
  body;

  @attr('string')
  commentsUrl;

  @computed
  get startOfWeek() {
    const currentDay = moment().day();
    const startIndex = currentDay < 6 ? -2 : 5;
    return moment().day(startIndex);
  }

  @computed('updatedAt', 'startOfWeek')
  get isNewThisWeek() {
    return this.updatedAt > this.startOfWeek;
  }

  @computed('mergedAt', 'startOfWeek')
  get landedThisWeek() {
    return this.mergedAt > this.startOfWeek;
  }

  @attr()
  head;
}
