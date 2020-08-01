import { computed } from '@ember/object';
import GithubRepositoryModel from 'ember-data-github/models/github-repository';
import moment from 'moment';

export default class GithubRepository extends GithubRepositoryModel {
  @computed
  get startOfWeek() {
    const currentDay = moment().day();
    const startIndex = currentDay < 6 ? -3 : 5;
    return moment().day(startIndex);
  }

  @computed('updatedAt', 'startOfWeek')
  get isNewThisWeek() {
    return this.updatedAt > this.startOfWeek;
  }
}
