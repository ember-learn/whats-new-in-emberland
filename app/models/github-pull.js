import { computed } from '@ember/object';
import GithubPullModel from 'ember-data-github/models/github-pull';
import moment from 'moment';
import DS from 'ember-data';

export default GithubPullModel.extend({
  body: DS.attr('string'),
  commentsUrl: DS.attr('string'),
  startOfWeek: computed(function() {
    const currentDay = moment().day();
    const startIndex = currentDay < 6 ? -2 : 5;
    return moment().day(startIndex);
  }),
  isNewThisWeek: computed('updatedAt', 'startOfWeek', function() {
    return this.get('updatedAt') > this.get('startOfWeek');
  }),
  landedThisWeek: computed('mergedAt', 'startOfWeek', function() {
    return this.get('mergedAt') > this.get('startOfWeek');
  }),
});
