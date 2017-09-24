import { computed } from '@ember/object';
import GithubPullModel from 'ember-data-github/models/github-pull';
import moment from 'moment';

export default GithubPullModel.extend({
  startOfWeek: computed(function() {
    const currentDay = moment().day();
    const startIndex = currentDay < 5 ? -3 : 4;
    return moment().day(startIndex);
  }),
  isNewThisWeek: computed('updatedAt', 'startOfWeek', function() {
    return this.get('updatedAt') > this.get('startOfWeek');
  }),
  landedThisWeek: computed('mergedAt', 'startOfWeek', function() {
    return this.get('mergedAt') > this.get('startOfWeek');
  }),
});
