import { computed } from '@ember/object';
import GithubRepositoryModel from 'ember-data-github/models/github-repository';
import moment from 'moment';

export default GithubRepositoryModel.extend({
  startOfWeek: computed(function() {
    const currentDay = moment().day();
    const startIndex = currentDay < 6 ? -3 : 5;
    return moment().day(startIndex);
  }),
  isNewThisWeek: computed('updatedAt', 'startOfWeek', function() {
    return this.updatedAt > this.startOfWeek;
  }),
});
