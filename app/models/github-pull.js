import { attr } from '@ember-data/model';
import { computed } from '@ember/object';
import GithubPullModel from 'ember-data-github/models/github-pull';
import moment from 'moment';

export default GithubPullModel.extend({
  body: attr('string'),
  commentsUrl: attr('string'),
  startOfWeek: computed(function() {
    const currentDay = moment().day();
    const startIndex = currentDay < 6 ? -2 : 5;
    return moment().day(startIndex);
  }),
  isNewThisWeek: computed('updatedAt', 'startOfWeek', function() {
    return this.updatedAt > this.startOfWeek;
  }),
  landedThisWeek: computed('mergedAt', 'startOfWeek', function() {
    return this.mergedAt > this.startOfWeek;
  }),
  head: attr(),
});
